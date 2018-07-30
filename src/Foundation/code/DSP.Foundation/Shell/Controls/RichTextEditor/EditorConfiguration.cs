using Sitecore.Configuration;
using Sitecore.Data.Items;

namespace DSP.Foundation.Shell.Controls.RichTextEditor
{
    public class EditorConfiguration : Sitecore.Shell.Controls.RichTextEditor.EditorConfiguration
    {
        /// <summary>
        /// See /sitecore/system/Settings/Html Editor Profiles/dspstarter/Rich Text Medium/Configuration Type
        /// and set this class and this dll in the type field
        /// </summary>
        public EditorConfiguration(Item profile) : base(profile) { }

        protected override void SetupStylesheets()
        {
            base.SetupStylesheets();

            // Add appropriate scedit.css
            Editor.CssFiles.Add(Settings.GetSetting("dspstarter.RichTextEditor.Stylesheet"));
            Editor.ContentAreaCssFile = Settings.GetSetting("dspstarter.RichTextEditor.ContentAreaCssFile");
            Editor.TableLayoutCssFile = Settings.GetSetting("dspstarter.RichTextEditor.EmptyTableStylesheet");
        }
    }
}
