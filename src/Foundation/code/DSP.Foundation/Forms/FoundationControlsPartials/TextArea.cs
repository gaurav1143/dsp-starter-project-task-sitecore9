using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public TextAreaControl<object> TextArea(string name, string value = null, string id = "",
            string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None, int? maxLength = null)
        {
            var model = new ControlModel<object>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            model.AddRuleIfMissing("maxlength", maxLength.GetValueOrDefault(2000).ToString(), RuleType.HtmlAttribute);

            return new TextAreaControl<object>(model);
        }

        public TextAreaControl<TProperty> TextArea<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var model = GetModel(expression);

            model.AddRuleIfMissing("maxlength", "2000", RuleType.HtmlAttribute);

            return new TextAreaControl<TProperty>(model);
        }
    }
}