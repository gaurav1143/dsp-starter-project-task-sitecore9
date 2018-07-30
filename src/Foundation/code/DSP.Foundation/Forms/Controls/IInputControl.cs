using System.Web;
using HtmlTags;

namespace DSP.Foundation.Forms.Controls
{
    public interface IInputControl: IHtmlString
    {
        HtmlTag Inner { get; }
        string ToPrettyString();
    }
}