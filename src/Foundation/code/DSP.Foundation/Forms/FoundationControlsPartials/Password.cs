using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public TextboxControl<string> Password(string name, string value = null, string id = "",
                string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None)
        {
            var model = new ControlModel<string>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            model.AddRuleIfMissing("password", "You have entered an invalid password.");
            model.AddRuleIfMissing("maxlength", "250", RuleType.HtmlAttribute);

            return new TextboxControl<string>(model, "password");
        }

        public TextboxControl<string> Password(Expression<Func<TModel, string>> expression)
        {
            var model = GetModel(expression);

            model.AddRuleIfMissing("password", "You have entered an invalid password.");
            model.AddRuleIfMissing("maxlength", "250", RuleType.HtmlAttribute);

            return new TextboxControl<string>(model, "password");
        }
    }
}