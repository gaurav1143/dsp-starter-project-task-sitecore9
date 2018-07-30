using System.Web.Mvc;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Global
{
    public class UtilitiesController : Controller
    {
        public ActionResult SetStatusCodeTo404()
        {
            Response.StatusCode = 404;
            Response.TrySkipIisCustomErrors = true;
            return Content(string.Empty);
        }
    }
}