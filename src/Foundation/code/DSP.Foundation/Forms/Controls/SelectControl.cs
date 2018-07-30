using System.Collections.Generic;
using System.Web.Mvc;
using HtmlTags;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms.Controls
{
    public class SelectControl<TProperty> : IInputControl
    {
        public SelectControl(ControlModel<TProperty> model, IEnumerable<SelectListItem> items,
            bool hideStatusMessage = false)
        {
            var select = new Select<TProperty>(model, items);
            if (!hideStatusMessage) select.After(new StatusMessage());

            // always wrap
            var control = select.WrapWith(new ControlWrapper());


            Inner = new ControlHolder()
                .Append(new Label<TProperty>(model))
                .Append(control);

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