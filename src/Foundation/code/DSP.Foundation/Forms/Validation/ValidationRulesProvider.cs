using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using DSP.Foundation.Forms;

namespace DSP.Foundation.Forms.Validation
{
    public class ValidationRulesProvider
    {
        private const string Attribute = "attribute";

        public IList<ClientRule> GetRulesForProperty(Type modelType, string propertyName)
        {
            // the MVC plumbing also seems to create some implict rules
            // for data types, e.g. an int will get a [Number] rule
            // there is a well known list of data types for these

            var attributes =  modelType.GetProperty(propertyName)
                .GetCustomAttributes(typeof(ValidationAttribute), false)
                .Cast<ValidationAttribute>();

            var rules = new List<ClientRule>();

            foreach (var attribute in attributes)
            {
                // let the ValidationAttribute provide custom rules, 
                // e.g. if there are multiple data- and html attributes to be rendered
                if (attribute is IClientRulesProvider)
                {
                    rules.AddRange((attribute as IClientRulesProvider).Rules());
                    continue;
                }

                // if it is a well known html rule
                if (ApplyHtmlAttributeRules(attribute, rules)) continue;

                // otherwise the default behaviour is to assume it is a data- rule
                rules.Add(CreateRule(attribute, RuleType.DataAttribute));
            }

            return rules;
        }

        private static bool ApplyHtmlAttributeRules(ValidationAttribute attribute, List<ClientRule> rules)
        {
            var lengthAttribute = attribute as MaxLengthAttribute;

            if (lengthAttribute != null)
            {
                rules.Add(new ClientRule("maxlength", lengthAttribute.Length.ToString(), RuleType.HtmlAttribute));
                return true;
            }

            var stringLengthAttribute = attribute as StringLengthAttribute;

            if (stringLengthAttribute != null)
            {
                rules.Add(new ClientRule("maxlength", stringLengthAttribute.MaximumLength.ToString(), RuleType.HtmlAttribute));
                rules.Add(new ClientRule("min", stringLengthAttribute.MinimumLength.ToString(), RuleType.HtmlAttribute));
                rules.Add(new ClientRule("max", stringLengthAttribute.MaximumLength.ToString(), RuleType.HtmlAttribute));
                return true;
            }

            return false;
        }

        private static ClientRule CreateRule(ValidationAttribute attribute, RuleType ruleType)
        {
            return new ClientRule(attribute.GetType().Name.ToLowerInvariant().Replace(Attribute, ""),
                attribute.FormatErrorMessage(attribute.ErrorMessage), ruleType);
        }
    }
}