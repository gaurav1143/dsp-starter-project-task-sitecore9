using System;
using DSP.Foundation.Extensions;
using Sitecore.Web.UI.HtmlControls;

namespace DSP.Foundation.Shell.Applications.ContentEditor
{
    // refer: http://www.partechit.nl/en/blog/2013/01/using-an-enumeration-as-data-source @ 20150225
    public class EnumList : Combobox
    {
        /// <summary>
        /// Source is a full type name and assembly, e.g. "MyAssembly.MyEnumType, MyAssembly"
        /// </summary>
        public string Source { get; set; }

        protected override void OnLoad(EventArgs e)
        {
            if (Controls.Count == 0)
            {
                try
                {
                    var enumType = Type.GetType(Source);

                    if (enumType == null) throw new NullReferenceException("enumType not found in source assembly");

                    foreach (Enum value in enumType.GetEnumValues())
                    {
                        var enumValue = Enum.GetName(enumType, value);

                        Controls.Add(new ListItem
                        {
                            ID = "EnumList_ListItem_" + Guid.NewGuid().ToString("N") + "_" + enumValue,
                            Header = value.ToDescription(),
                            Value = enumValue
                        });
                    }
                }
                catch (Exception ex)
                {
                    Sitecore.Diagnostics.Log.Error("Error loading EnumList control", ex, this);

                    Controls.Add(new ListItem
                    {
                        ID = "EnumList_ListItem_" + Guid.NewGuid().ToString("N") + "_NotFound",
                        Header = "Could not load enumeration"
                    });
                }
            }

            base.OnLoad(e);
        }
    }
}
