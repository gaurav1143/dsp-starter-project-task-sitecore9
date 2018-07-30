using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Globalization;

namespace DSP.Foundation.sitecore.admin
{
    public partial class GenerateDocumentation : System.Web.UI.Page
    {
        public IEnumerable<TemplateItem> Templates { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            Templates =
                Database.GetDatabase("master")
                    .Templates.GetTemplates(Language.Invariant)
                    .Where(x => x.FullName.StartsWith("Deloitte"))
                    .OrderBy(x => x.FullName);
        }
    }
}