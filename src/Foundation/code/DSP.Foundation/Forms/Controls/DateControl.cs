using System;
using HtmlTags;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms.Controls
{
    public class DateControl : IInputControl
    {
        public DateControl(ControlModel<DateTime> model, DateOptions dateOptions = null)
            : this(new ControlModel<DateTime?>(model.Id, model.Name, model.Value, model.DisplayName, model.Rules, model.LabelOption), dateOptions)
        {
            // converted to nullable
        }

        public DateControl(ControlModel<DateTime?> model, DateOptions dateOptions = null)
        {
            var inner = new ControlHolder()
                            .Append(new Label<DateTime?>(model));

            var tb = new TextBox<DateTime?>(model)
                .After(new StatusMessage());

            inner.Append(tb.WrapWith(new ControlWrapper()));

            tb.AddClass("datepicker js-datepicker vh");
            tb.Attr("aria-hidden", "true");

            dateOptions = dateOptions ?? new DateOptions();

            if (model.Value != null) tb.Value(model.Value?.ToString(dateOptions.Format));

            tb.Data("format", dateOptions.Format.ToUpperInvariant());
            tb.Data("output-format", dateOptions.OutputFormat.ToUpperInvariant());
            tb.Data("year-range", dateOptions.YearRange);
            tb.Data("today", dateOptions.ShowToday);

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

        public string ToPrettyString()
        {
            return Inner.ToPrettyString();
        }

        public HtmlTag Inner { get; }
    }

    public class DateOptions
    {
        public DateOptions()
        {
            Format = "dd/MM/yyyy";
            OutputFormat = "dd/MM/yyyy";
            YearRange = 20;
            ShowToday = true;
        }

        public string Format { get; set; }
        public string OutputFormat { get; set; }
        public int YearRange { get; set; }
        public bool ShowToday { get; set; }
    }
}