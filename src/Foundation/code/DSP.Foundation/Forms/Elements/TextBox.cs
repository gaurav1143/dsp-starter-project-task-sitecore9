using System;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class TextBox<TProperty> : HtmlTag
    {
        public TextBox(ControlModel<TProperty> model, string type = "text", bool disableAutocomplete = false)
            : this("input", tag => tag.Attr("type", type))
        {
            if (model.HasId) Id(model.Id);
            if (model.Value != null) Value(model.Value?.ToString());
            if (disableAutocomplete) Attr("autocomplete", "off");

            Name(model.Name);
            AddClass("text");

            this.AddRules(model.Rules);
        }

        protected TextBox(string tag) : base(tag) { }
        protected TextBox(string tag, Action<HtmlTag> configure) : base(tag, configure) { }
        protected TextBox(string tag, HtmlTag parent) : base(tag, parent) { }
    }
}