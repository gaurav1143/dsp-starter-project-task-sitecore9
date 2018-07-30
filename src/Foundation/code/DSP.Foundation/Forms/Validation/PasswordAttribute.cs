using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace DSP.Foundation.Forms.Validation
{
    [AttributeUsage(AttributeTargets.Property)]
    public class PasswordAttribute : ValidationAttribute
    {
        // NOTE: try and keep this in sync with the javascript rule
        public const string ValidPasswordRegexString = @"^((?=.*\d)(?=.*[A-Z])(?=.*[a-z]))([a-zA-Z0-9`~!@#^\*\(\)\-_=+\[\]\{\}\\\|:;',<\.>/\?""\$\%]){6,14}$";

        public PasswordAttribute()
        {
            ErrorMessage = "You have entered an invalid password.<br>Please try again";
        }

        public PasswordAttribute(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public override bool IsValid(object value)
        {
            // if no value then it is invalid
            if (value == null) return false;

            var input = value.ToString();

            return Regex.IsMatch(input, PasswordStengthRegularExpression ?? ValidPasswordRegexString);
        }

        /// <summary>
        /// Override the default password strength regular expression
        /// </summary>
        public string PasswordStengthRegularExpression { get; set; }
    }
}