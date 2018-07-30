using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public CheckBoxControl CheckBox(string name, bool value = false, string tooltip = "",
            string helptext = "", string id = "", string displayName = null, bool isRequired = false)
        {
            var model = new ControlModel<bool>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: LabelOption.Hide);

            model = ApplyRequiredRule(model, isRequired);

            return new CheckBoxControl(model, tooltip, helptext);
        }

        public CheckBoxControl CheckBox(Expression<Func<TModel, bool>> expression,
            string tooltip = "", string helptext = "")
        {
            var model = GetModel(expression);

            // Do not display the label at the top 
            model.LabelOption = LabelOption.Hide; 

            return new CheckBoxControl(model, tooltip, helptext);
        }
    }
}