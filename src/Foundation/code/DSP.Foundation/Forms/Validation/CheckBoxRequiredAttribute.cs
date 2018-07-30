using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DSP.Foundation.Forms;

namespace DSP.Foundation.Forms.Validation
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
    public class CheckBoxRequiredAttribute : ValidationAttribute, IClientRulesProvider
    {
        public CheckBoxRequiredAttribute() : this("This field is required.")
        {
        }

        public CheckBoxRequiredAttribute(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public override bool IsValid(object value)
        {
            // must be bool and must be true
            if (value == null) return false;

            var result = false;

            bool.TryParse(value.ToString(), out result);

            return result;
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
                new ClientRule("required", ErrorMessage, RuleType.DataAttribute)
            };
        }
    }
}