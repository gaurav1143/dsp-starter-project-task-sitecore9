using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms.Controls;

namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public SuccessSummaryControl<object> SuccessSummary(string name, string value = null, string id = "",
            string displayName = null)
        {
            var model = new ControlModel<object>(id, name, value, displayName ?? GetDisplayName(name, name));
            return model.Value.ToString() != "True" ? null : new SuccessSummaryControl<object>(model);
        }

        public SuccessSummaryControl<TProperty> SuccessSummary<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var model = GetModel(expression);
            return model.Value.ToString() != "True" ? null : new SuccessSummaryControl<TProperty>(model);
        }
    }
}