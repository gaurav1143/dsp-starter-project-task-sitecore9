using System;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class TextArea<TProperty> : HtmlTag
    {
        public TextArea(ControlModel<TProperty> model)
            : this("textarea", tag => tag.Attr("type", "text"))
        {
            if (model.HasId) Id(model.Id);
            // textarea does not have value attribute, use inner text
            if (model.Value != null) Text(model.Value?.ToString());

            Name(model.Name);
            AddClass("text");

            this.AddRules(model.Rules);
        }

        protected TextArea(string tag) : base(tag) { }
        protected TextArea(string tag, Action<HtmlTag> configure) : base(tag, configure) { }
        protected TextArea(string tag, HtmlTag parent) : base(tag, parent) { }
    }
}