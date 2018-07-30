using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using DSP.Foundation.Forms.Validation;

namespace DSP.Feature.ExampleForms.Modules.ExampleForms.ContactForm
{
    /// <summary>
    /// View Model object only needs to inherit IValidateObject if the model object validation is more complex than simply checking if required etc.
    /// Usually applied if there is show/hide behaviour, where a field is required when shown, but not required when hidden.
    /// </summary>
    public class ContactForm : IValidatableObject
    {
        [DisplayName("Full name")]
        [Required(ErrorMessage = "Full name is required ")]  //Example of custom error message
        public string Name { get; set; }

        [DisplayName("Email address")]
        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email.")]
        public string Email { get; set; }

        [DisplayName("Business phone")]
        [PhoneGeneral(ErrorMessage = "Please enter a valid phone number.")]
        public string BusinessPhoneNumber { get; set; }

        [DisplayName("After hours phone")]
        [PhoneGeneral(ErrorMessage = "Please enter a valid phone number.")]
        public string AfterHoursPhoneNumber { get; set; }

        /// <summary>
        /// Required as a part of IValidatableObject interface. Not needed for simple forms that have straight forward model validation.
        /// Usually needed if you have complex show/hide validation or a field is only mandatory in certain scenarios.
        /// </summary>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (!PhoneNumbersVerified(this)) yield return new ValidationResult("Please enter at least one phone number.");
        }

        private static bool PhoneNumbersVerified(ContactForm form)
        {
            return form.BusinessPhoneNumber != null
                   || form.AfterHoursPhoneNumber != null;
        }
    }
}