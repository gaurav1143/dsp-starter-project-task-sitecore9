using System;
using System.Web.Mvc;
using HtmlTags;
using DSP.Foundation.Forms.Includes;

namespace DSP.Foundation.Forms.Elements
{
    public class RadioCheckboxItem<TProperty> : HtmlTag
    {
        public RadioCheckboxItem(ControlModel<TProperty> model, SelectListItem item, string type, string tooltip = "",
            string helptext = "")
            : this("input")
        {
            string id;

            if (item != null)
            {
                id = (string.IsNullOrWhiteSpace(model.Id) ? model.Name : model.Id) + "-" + item.Value;

                if (model.Value != null
                    && (item.Value ?? "").Equals(model.Value?.ToString(), StringComparison.OrdinalIgnoreCase))
                {
                    Attr("checked", "checked");
                }
            }
            else
            {
                id = string.IsNullOrWhiteSpace(model.Id) ? model.Name : model.Id;

                if (model.Value != null 
                    && (model.Value.ToString()).Equals(bool.TrueString, StringComparison.OrdinalIgnoreCase))
                {
                    Attr("checked", "checked");
                }

                item = new SelectListItem
                {
                    Text = model.DisplayName,
                    Value = model.Value?.ToString()

                };
            }

            Name(model.Name);
            Attr("type", type);
            Value(item.Value);
            Id(id);

            this.AddRules(model.Rules);

            var label = new Label<TProperty>(new ControlModel<TProperty>(id, model.Name, model.Value, item.Text));

            // Tooltip 
            if (!string.IsNullOrEmpty(tooltip))
            {
                label.AppendHtml(new Tooltip(tooltip).ToString());
            }

            // Help text 
            if (!string.IsNullOrEmpty(helptext))
            {
                label.AppendHtml(new HelpText(helptext).ToString());
            }

            Append(label);

            Append(new HtmlTag("div", tag => tag.AddClass("chk-check")));
        }

        protected RadioCheckboxItem(string tag) : base(tag)
        {
        }

        protected RadioCheckboxItem(string tag, Action<HtmlTag> configure) : base(tag, configure)
        {
        }

        protected RadioCheckboxItem(string tag, HtmlTag parent) : base(tag, parent)
        {
        }
    }
}