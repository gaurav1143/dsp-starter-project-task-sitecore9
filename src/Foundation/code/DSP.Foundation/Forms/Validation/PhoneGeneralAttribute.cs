using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;
using DSP.Foundation.Forms;

namespace DSP.Foundation.Forms.Validation
{
    /// <summary>
    /// Validate a phone number. By defautl phone number must be 14 characters or less. 
    /// Allowed characters are digits, space or +-()
    /// </summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
    public class PhoneGeneralAttribute : ValidationAttribute, IClientRulesProvider
    {
        private readonly int _maxLength;

        private static readonly Regex Rule = new Regex(@"
^ # from start of string
( # start capture
[\s*\-\+\(\)]* # zero or more special characters 
\d+ # by 1 or more digits
) # end capture
+ # 1 or more times
$ # to end of string",
            RegexOptions.IgnorePatternWhitespace | RegexOptions.Compiled | RegexOptions.Singleline);

        public PhoneGeneralAttribute(int maxLength = 14) : this("The phone number is invalid", maxLength)
        {
        }

        public PhoneGeneralAttribute(string errorMessage, int maxLength = 14)
        {
            _maxLength = maxLength;
            ErrorMessage = errorMessage;
        }

        public override bool IsValid(object value)
        {
            // if no value then we do not care
            if (value == null) return true;

            var str = value.ToString();

            if (str.Length > _maxLength) return false;

            return Rule.IsMatch(str);
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            return !IsValid(value)
                ? new ValidationResult(FormatErrorMessage(validationContext.DisplayName))
                : null;
        }

        public IEnumerable<ClientRule> Rules()
        {
            return new []
            {
                new ClientRule("phonegeneral", ErrorMessage, RuleType.DataAttribute),
                new ClientRule("maxlength", _maxLength.ToString(), RuleType.HtmlAttribute)
            };
        }
    }
}