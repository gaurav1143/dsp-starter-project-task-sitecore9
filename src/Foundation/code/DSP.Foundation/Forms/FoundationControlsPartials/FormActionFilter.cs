using System.Web;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public IHtmlString FormAction(string actionName, string fieldName = Constants.FormActionFilterName)
        {
           return new HtmlString($@"<input type=""hidden"" name=""{fieldName}"" value=""{actionName}"" />" );
        }
    }
}