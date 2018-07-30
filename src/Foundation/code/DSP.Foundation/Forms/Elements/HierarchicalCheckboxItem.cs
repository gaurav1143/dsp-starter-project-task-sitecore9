using HtmlTags;
using System;
using System.Collections;
using System.Linq;
using System.Web.Mvc;

namespace DSP.Foundation.Forms.Elements
{
    public class HierarchicalCheckboxItem<TProperty> : HtmlTag
    {
        public HierarchicalCheckboxItem(ControlModel<TProperty> model, SelectListItem item, bool isDisabled)
            : this("input")
        {
            var id = (string.IsNullOrWhiteSpace(model.Id) ? model.Name : model.Id) + "-" + item.Value;

            if (model.Value != null)
            {
                if (
                    ((IEnumerable)model.Value).Cast<object>()
                        .Any(m => (item.Value ?? "").Equals(m?.ToString(), StringComparison.OrdinalIgnoreCase)))
                {
                    Attr("checked", "checked");
                }
            }

            if (isDisabled)
            {
                Attr("disabled", "disabled");
            }

            Name(model.Name);
            Attr("type", "checkbox");
            Value(item.Value);
            Id(id);

            this.AddRules(model.Rules);

            Append(new Label<TProperty>(new ControlModel<TProperty>(id, model.Name, model.Value, item.Text)));
            Append(new HtmlTag("div", tag => tag.AddClass("chk-check")));
        }

        protected HierarchicalCheckboxItem(string tag) : base(tag)
        {
        }

        protected HierarchicalCheckboxItem(string tag, Action<HtmlTag> configure) : base(tag, configure)
        {
        }

        protected HierarchicalCheckboxItem(string tag, HtmlTag parent) : base(tag, parent)
        {
        }
    }
}