using System;
using System.Linq;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public TextboxControl<object> Phone(string name, string value = null, string id = "",
            string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None)
        {
            var model = new ControlModel<object>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);
            model.AddRuleIfMissing("phonegeneral", "The phone number is invalid");
            model.AddRuleIfMissing("maxlength", "20", RuleType.HtmlAttribute);


            return new TextboxControl<object>(model, type: "tel");
        }

        public TextboxControl<TProperty> Phone<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var model = GetModel(expression);

            model.AddRuleIfMissing("maxlength", "20", RuleType.HtmlAttribute);
            model.AddRuleIfMissing("phonegeneral", "The phone number is invalid");

            return new TextboxControl<TProperty>(model, type: "tel");
        }
    }
}