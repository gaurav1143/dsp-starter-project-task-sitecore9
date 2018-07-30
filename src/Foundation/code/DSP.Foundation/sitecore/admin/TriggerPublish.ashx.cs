using System.Web;

namespace DSP.Foundation.sitecore.admin
{
    /// <summary>
    /// Endpoint to trigger a publish job (e.g. as a continous deployment step)
    /// </summary>
    public class TriggerPublish : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            // Get the publish type from the query string. Default to smart
            var type = HttpContext.Current.Request["PublishType"] ?? "smart";

            // Get the databases
            var masterDb = Sitecore.Data.Database.GetDatabase("master");
            var webDb = Sitecore.Data.Database.GetDatabase("web");

            // Kick off a publish in the current language
            // one day we should Update this code to publish all languages
            switch (type.ToLowerInvariant())
            {
                case "incremental":
                    Sitecore.Publishing.PublishManager.WaitFor(Sitecore.Publishing.PublishManager.PublishIncremental(masterDb, new[] { webDb }, new[] { Sitecore.Globalization.Language.Current }));
                    break;

                case "smart":
                    Sitecore.Publishing.PublishManager.WaitFor(Sitecore.Publishing.PublishManager.PublishSmart(masterDb, new[] { webDb }, new[] { Sitecore.Globalization.Language.Current }));
                    break;

                case "full":
                    Sitecore.Publishing.PublishManager.WaitFor(Sitecore.Publishing.PublishManager.Republish(masterDb, new[] { webDb }, new[] { Sitecore.Globalization.Language.Current }));
                    break;
            }

            context.Response.ContentType = "text/plain";
            context.Response.Write("Publishing triggered");
        }

        public bool IsReusable => false;
    }
}