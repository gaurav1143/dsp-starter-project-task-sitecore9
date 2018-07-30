using System;
using System.ComponentModel.DataAnnotations;

namespace DSP.Foundation.Forms.Validation
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
    public class PostcodeAttribute : ValidationAttribute
    {
        private const int MaxLength = 4;

        public PostcodeAttribute()
            :this("Please enter a valid postcode")
        {
            
        }

        public PostcodeAttribute(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public override bool IsValid(object value)
        {
            if (value == null) return true;

            var str = value.ToString();

            int postcode;
            if (!int.TryParse(str, out postcode)) return false;

            return str.Length == MaxLength;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            return !IsValid(value)
                ? new ValidationResult(FormatErrorMessage(validationContext.DisplayName))
                : null;
        }
    }
}