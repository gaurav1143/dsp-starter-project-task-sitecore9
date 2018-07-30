using HtmlTags;
using DSP.Foundation.Forms.Elements;
using DSP.Foundation.Forms.Includes;

namespace DSP.Foundation.Forms.Controls
{
    public class CheckBoxControl : IInputControl
    {
        public CheckBoxControl(ControlModel<bool> model, string tooltip, string helptext)
        {
            // div class="ctrl-holder"
            Inner = new ControlHolder().Append(new Label<bool>(model, true));

            // div class="option"
            var divOption = new HtmlTag("div", tag => tag.AddClass("option"));

            // refer the native MVC implementation of CheckBoxFor 
            // checkboxes behave weirdly - if they are not checked then they are not posted back
            // the fallback value of False is supplied by the hidden field
            divOption.Append(CheckBox(model, tooltip, helptext));
            divOption.Append(new HiddenTag().Name(model.Name).Value(bool.FalseString));

            // div class="status-msg"
            divOption.After(new StatusMessage());

            Inner.Append(divOption.WrapWith(new ControlWrapper()));
        }

        private static HtmlTag CheckBox(ControlModel<bool> model, string tooltip, string helptext)
        {
            var checkBox = new HtmlTag("input");
            var id = (string.IsNullOrWhiteSpace(model.Id) ? model.Name : model.Id);

            if (model.Value) checkBox.Attr("checked", "checked");

            checkBox.Name(model.Name);
            checkBox.Attr("type", "checkbox");
            // the value is always True
            checkBox.Value(bool.TrueString);
            checkBox.Id(id);
            checkBox.AddRules(model.Rules);

            var label = new Label<bool>(new ControlModel<bool>(id, model.Name, model.Value, model.DisplayName));

            // Tooltip 
            if (!string.IsNullOrEmpty(tooltip)) label.AppendHtml(new Tooltip(tooltip).ToString());

            // Help text 
            if (!string.IsNullOrEmpty(helptext)) label.AppendHtml(new HelpText(helptext).ToString());

            checkBox.Append(label);
            checkBox.Append(new HtmlTag("div", tag => tag.AddClass("chk-check")));

            return checkBox;
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