using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using DSP.Foundation.Forms;

namespace DSP.Foundation.Forms.Validation
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
    public class MoneyAttribute : ValidationAttribute, IClientRulesProvider
    {
        public const string DollarRegexString = @"(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$";

        public MoneyAttribute() : this("Please enter a valid currency.") { }

        public MoneyAttribute(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public override bool IsValid(object value)
        {
            // if no value then we do not care
            if (value == null) return true;

            var str = value.ToString();

            return Regex.IsMatch(str, DollarRegexString);
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            return !IsValid(value)
                ? new ValidationResult(FormatErrorMessage(validationContext.DisplayName))
                : null;
        }

        public IEnumerable<ClientRule> Rules()
        {
            return new[]
            {
                new ClientRule("currency", ErrorMessage, RuleType.DataAttribute)
            };
        }
    }
}