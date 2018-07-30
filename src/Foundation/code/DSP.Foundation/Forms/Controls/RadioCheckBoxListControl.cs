using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using HtmlTags;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms.Controls
{
    public class RadioCheckBoxListControl<TProperty> : IInputControl
    {
        public RadioCheckBoxListControl(ControlModel<TProperty> model, IEnumerable<SelectListItem> items, string type, bool isHorizontal)
        {
            var options = items.ToList();

            if (!options.Any()) return;

            Inner = new ControlHolder()
                .Append(new Label<TProperty>(model, true));

            var ul = new HtmlTag("ul");
            ul.AddClass("options");
            ul.Attr("role", "radiogroup");
            ul.Attr("aria-labelledby", model.Name);

            if (isHorizontal) ul.AddClass("is-horizontal");

            foreach (var item in options)
            {
                var li = new HtmlTag("li", tag => tag.AddClass("option"));

                li.Append(new RadioCheckboxItem<TProperty>(model, item, type));

                ul.Append(li);
            }

            ul.After(new StatusMessage());

            Inner.Append(ul.WrapWith(new ControlWrapper()));
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