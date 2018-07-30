using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public TextboxControl<object> Email(string name, string value = null, string id = "",
        string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None)
        {
            var model = new ControlModel<object>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);
            model.AddRuleIfMissing("emailadress", "The field is not a valid e-mail address.");
            model.AddRuleIfMissing("maxlength", "250", RuleType.HtmlAttribute);

            return new TextboxControl<object>(model, "email");
        }

        public TextboxControl<TProperty> Email<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var model = GetModel(expression);

            model.AddRuleIfMissing("maxlength", "250", RuleType.HtmlAttribute);
            model.AddRuleIfMissing("emailadress", "The field is not a valid e-mail address.");

            return new TextboxControl<TProperty>(model, "email");
        }
    }
}