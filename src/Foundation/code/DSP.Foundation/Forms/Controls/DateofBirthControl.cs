using System;
using System.Collections.Generic;
using System.Web.Mvc;
using HtmlTags;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms.Controls
{
    public class DateofBirthControl : IInputControl
    {
        private static readonly IEnumerable<SelectListItem> Months = new List<SelectListItem>
            {
                new SelectListItem {Text = "Month", Value = ""},
                new SelectListItem {Text = "January", Value = "01"},
                new SelectListItem {Text = "February", Value = "02"},
                new SelectListItem {Text = "March", Value = "03"},
                new SelectListItem {Text = "April", Value = "04"},
                new SelectListItem {Text = "May", Value = "05"},
                new SelectListItem {Text = "June", Value = "06"},
                new SelectListItem {Text = "July", Value = "07"},
                new SelectListItem {Text = "August", Value = "08"},
                new SelectListItem {Text = "September", Value = "09"},
                new SelectListItem {Text = "October", Value = "10"},
                new SelectListItem {Text = "November", Value = "11"},
                new SelectListItem {Text = "December", Value = "12"}
            };

        public DateofBirthControl(ControlModel<DateTime> model)
            : this(new ControlModel<DateTime?>(model.Id, model.Name, model.Value, model.DisplayName, model.Rules, model.LabelOption))
        {
            // converted to nullable
        }

        public DateofBirthControl(ControlModel<DateTime?> model)
        {
            var dayName = model.Name + "-" + "day";
            var monthName = model.Name + "-" + "month";
            var yearName = model.Name + "-" + "year";

            model.AddRule("dob", "Please enter a valid date of birth.", RuleType.DataAttribute);

            var dayModel = new ControlModel<int?>(dayName, dayName, model.Value?.Day, "Day", model.Rules, LabelOption.Hide);
            var monthModel = new ControlModel<string>(monthName, monthName, model.Value?.Month.ToString("D2"), "Month", model.Rules, LabelOption.Hide);
            var yearModel = new ControlModel<int?>(yearName, yearName, model.Value?.Year, "Year", model.Rules, LabelOption.Hide);

            Inner = new ControlHolder().AddClass("js-dob")
                .Append(new Label<DateTime?>(new ControlModel<DateTime?>(dayName, dayName, model.Value, model.DisplayName, model.Rules, model.LabelOption)))
                .Append(new HtmlTag("div", tag => tag.AddClass("ctrls"))
                    .Append(new TextboxControl<int?>(dayModel, hideStatusMessage: true).Attribute("maxlength", "2").Placeholder("DD").AddClass("width-date-day").Inner)
                    .Append(new SelectControl<string>(monthModel, Months, hideStatusMessage: true).AddClass("width-date-month").Inner)
                    .Append(new TextboxControl<int?>(yearModel, hideStatusMessage: true).Attribute("maxlength", "4").Placeholder("YYYY").AddClass("width-date-year").Inner)
                    // hidden field gets populated by javaScript and is what is POSTED back
                    .Append(new HiddenTag().Name(model.Name).Id(model.Name).Data("dob-bind-value", "DD MMM YYYY").Value(model.Value?.ToString("dd MMM yyyy") ?? ""))
                    ).Append(new StatusMessage());
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
