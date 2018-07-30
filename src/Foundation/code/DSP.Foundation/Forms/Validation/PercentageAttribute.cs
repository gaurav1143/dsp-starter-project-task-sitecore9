using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DSP.Foundation.Forms;

namespace DSP.Foundation.Forms.Validation
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
    public class PercentageAttribute : ValidationAttribute, IClientRulesProvider
    {
        public PercentageAttribute() : this("Please enter a valid percentage.") { }

        public PercentageAttribute(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public override bool IsValid(object value)
        {
            // if no value then we do not care
            if (value == null) return true;

            var str = value.ToString();

            decimal percent;
            if (decimal.TryParse(str, out percent))
            {
                return percent >= 0 && percent <= 100;
            }

            return false;
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
                new ClientRule("percentage", ErrorMessage, RuleType.DataAttribute)
            };
        }
    }
}