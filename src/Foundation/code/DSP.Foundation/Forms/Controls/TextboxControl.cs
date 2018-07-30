using System;
using HtmlTags;
using DSP.Foundation.Forms.Elements;
using DSP.Foundation.Forms.Includes;

namespace DSP.Foundation.Forms.Controls
{
    public class TextboxControl<TProperty> : IInputControl
    {
        public TextboxControl(ControlModel<TProperty> model, string type = "text", bool disableAutocomplete = false, bool hideStatusMessage = false, string helpText = "")
        {
            if ("password".Equals(type, StringComparison.OrdinalIgnoreCase))
            {
                // SECURITY: never render the password
                model.Value = default(TProperty);
            }

            var inner  = new ControlHolder()
                .Append(new Label<TProperty>(model));

            var tb = new TextBox<TProperty>(model, type, disableAutocomplete);

            if (!string.IsNullOrEmpty(helpText)) tb.AppendHtml(new HelpText(helpText).ToString());

            if(!hideStatusMessage) tb.After(new StatusMessage());

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

        public HtmlTag Inner { get; }
        public string ToPrettyString()
        {
            return Inner.ToPrettyString();
        }
    }
}