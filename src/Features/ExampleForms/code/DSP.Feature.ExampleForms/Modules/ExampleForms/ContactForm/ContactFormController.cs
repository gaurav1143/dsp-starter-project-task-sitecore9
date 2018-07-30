using System.Web.Mvc;
using DeloitteDigital.Atlas.Mvc.Forms;
using DSP.Foundation.Mvc;

namespace DSP.Feature.ExampleForms.Modules.ExampleForms.ContactForm
{
    public class ContactFormController : FoundationController
    {
        [HttpGet]
        public ActionResult ContactForm()
        {
            return View("~/Modules/ExampleForms/ContactForm/ContactForm.cshtml");
        }

        [HttpPost]
        [ValidRenderingToken]
        [ValidateAntiForgeryToken]
        public ActionResult ContactForm(ContactForm viewModel)
        {
            return !ModelState.IsValid 
                ? View("~/Modules/ExampleForms/ContactForm/ContactForm.cshtml", viewModel) 
                : View("~/Modules/ExampleForms/ContactForm/Confirmation.cshtml");
        }
    }
}