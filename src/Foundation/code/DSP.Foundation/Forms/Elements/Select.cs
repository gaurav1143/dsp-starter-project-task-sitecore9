using System;
using System.Collections.Generic;
using System.Web.Mvc;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class Select<TProperty> : HtmlTag
    {
        public Select(ControlModel<TProperty> model, IEnumerable<SelectListItem> options)
            : this("select")
        {
            foreach (var item in options)
            {
                if (model.HasId) Id(model.Id);

                Name(model.Name);

                Append(new HtmlTag("option", tag =>
                {
                    tag.Text(item.Text);
                    tag.Value(item.Value);
                    if (model.Value != null && item.Value == model.Value?.ToString()) tag.Attr("selected", "selected");
                }));
            }

            this.AddRules(model.Rules);
        }

        protected Select(string tag) : base(tag) { }
        protected Select(string tag, Action<HtmlTag> configure) : base(tag, configure) { }
        protected Select(string tag, HtmlTag parent) : base(tag, parent) { }
    }
}