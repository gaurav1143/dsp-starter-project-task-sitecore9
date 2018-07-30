using System;
using DSP.Foundation.Forms;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class Label<TProperty> : HtmlTag
    {
        public Label(ControlModel<TProperty> model, bool inline = false)
            : this(inline ? "span" : "label")
        {
            switch (model.LabelOption)
            {
                case LabelOption.None: break;
                case LabelOption.Hide:
                    // # hide from display (but not from screenreaders)
                    AddClass("vh");
                    break;
                case LabelOption.Remove:
                    // # remove the label entirely
                    Render(false);
                    // no more work to do
                    return;
            }
            
            if (!inline) Attr("for", string.IsNullOrWhiteSpace(model.Id) ? model.Name : model.Id);
            if (inline) AddClass("label");

            Encoded(false);
            Text(model.DisplayName);

            // # add empty text, and a class indicating it's empty
            if (string.IsNullOrWhiteSpace(model.DisplayName)) AddClass(("is-empty"));

            // # Add required message to label
            if (model.IsRequired) AppendHtml("<em>*<span class=\"vh\">Required field</span></em>");

            // # add help text to the label if needed
            // as an extension
        }

        protected Label(string tag) : base(tag)
        {
        }

        protected Label(string tag, Action<HtmlTag> configure) : base(tag, configure)
        {
        }

        protected Label(string tag, HtmlTag parent) : base(tag, parent)
        {
        }
    }
}