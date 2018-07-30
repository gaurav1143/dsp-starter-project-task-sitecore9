using HtmlTags;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms.Controls
{
    public class SuccessSummaryControl<TProperty> : IInputControl
    {
        public SuccessSummaryControl(ControlModel<TProperty> model)
        {
            Inner = new HtmlTag("div", tag => tag.AddClass("form-summary is-success"))
            .Append(new HtmlTag("div", tag => tag.AddClass("form-summary-title"))
            .Append(new HtmlTag("h2").Text("Success")))
            .Append(new HtmlTag("p").Text(model.DisplayName));        
        }

        public override string ToString()
        {
            return Inner.ToString();
        }

        public string ToHtmlString()
        {
            return Inner.ToHtmlString();
        }

        public string ToPrettyString()
        {
            return Inner.ToPrettyString();
        }

        public HtmlTag Inner { get; }
    }
}