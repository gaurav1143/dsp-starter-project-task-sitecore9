using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Elements;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public Label<object> Label(string labelFor, string labelText, bool isRequired = false)
        {
            var model = new ControlModel<object>(labelFor, labelFor, labelText, labelText);

            model = ApplyRequiredRule(model, isRequired);

            return new Label<object>(model);
        }

        public Label<TProperty> Label<TProperty>(Expression<Func<TModel, TProperty>> expression, string labelText = null, string tooltipText = null)
        {
            var model = GetModel(expression);

            // always render 
            model.LabelOption = LabelOption.None;
            model.DisplayName = labelText ?? model.DisplayName;
            model.TooltipText = tooltipText;

            return new Label<TProperty>(model);
        }
    }
}