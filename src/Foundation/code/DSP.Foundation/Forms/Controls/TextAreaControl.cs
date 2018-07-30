using HtmlTags;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms.Controls
{
    public class TextAreaControl<TProperty> : IInputControl
    {
        public TextAreaControl(ControlModel<TProperty> model)
        {
            var inner = new ControlHolder()
                .Append(new Label<TProperty>(model));

            var tb = new TextArea<TProperty>(model)
                 .After(new StatusMessage());

            // always wrap
            inner.Append(tb.WrapWith(new ControlWrapper()));

            Inner = inner;
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