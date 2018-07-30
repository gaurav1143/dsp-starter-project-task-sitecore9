using System.Web;
using HtmlTags;
using DSP.Foundation.Forms.Elements;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public Button SubmitButton(string text = "Submit", bool showCancel = false, bool disable = false, 
            string cancelUrl = null, bool hideCtaClass = false, bool hideBtnHolder = false)
        {
            var button = new Button(text, "submit", hideCtaClass, hideBtnHolder);

            if (IsSitecore() || disable) button.Attr("disabled", "disabled");

            if (showCancel)
            {
                button.Parent?.Append(new HtmlTag("a").Text("Cancel").Attr("href",
                        string.IsNullOrEmpty(cancelUrl) ? HttpContext.Current.Request.Url.AbsolutePath : cancelUrl)
                    .AddClass("cta is-tertiary"));
            }

            return button;
        }
    }
}