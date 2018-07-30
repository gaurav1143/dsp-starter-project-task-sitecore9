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
        public TextboxControl<object> SecurityQuestion(string name, string value = null, string id = "",
                string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None)
        {
            var model = new ControlModel<object>(id, name, value, value, labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);
            model.AddRuleIfMissing("securityquestion", "Please enter a valid security question");

            return new TextboxControl<object>(model, disableAutocomplete: true);
        }

        public TextboxControl<TProperty> SecurityQuestion<TProperty>(Expression<Func<TModel, TProperty>> expression, string labelText)
        {
            var model = GetModel(expression);

            model.DisplayName = labelText;

            if (!model.Rules.Any(rule => rule.Name.Equals("securityquestion")))
            {
                model.AddRuleIfMissing("securityquestion", "Please enter a valid security question");
            }

            return new TextboxControl<TProperty>(model, disableAutocomplete: true);
        }
    }
}