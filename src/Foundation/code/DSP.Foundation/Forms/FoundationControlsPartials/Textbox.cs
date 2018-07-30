using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public TextboxControl<object> TextBox(string name, string value = null, string id = "",
                string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None, int? maxLength = null, string helpText = "")
        {
            var model = new ControlModel<object>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            if (maxLength.HasValue)
            {
                model.AddRuleIfMissing("maxlength", maxLength.Value.ToString(), RuleType.HtmlAttribute);    
            }

            model.AddRuleIfMissing("maxlength", "250", RuleType.HtmlAttribute);

            return new TextboxControl<object>(model, helpText: helpText);
        }

        public TextboxControl<TProperty> TextBox<TProperty>(Expression<Func<TModel, TProperty>> expression, string helpText = "")
        {
            var model = GetModel(expression);

            model.AddRuleIfMissing("maxlength", "250", RuleType.HtmlAttribute);

            return new TextboxControl<TProperty>(model, helpText: helpText);
        }
    }
}