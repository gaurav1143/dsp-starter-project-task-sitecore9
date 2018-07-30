using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public DateControl Date(string name, DateTime? value = null, string id = "",
            string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None, DateOptions dateOptions = null)
        {
            var model = new ControlModel<DateTime?>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            return new DateControl(model, dateOptions);
        }

        public DateControl Date(Expression<Func<TModel, DateTime?>> expression, DateOptions dateOptions = null)
        {
            var model = GetModel(expression);

            return new DateControl(model, dateOptions);
        }

        public DateControl Date(string name, DateTime value, string id = "",
            string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None, DateOptions dateOptions = null)
        {
            return Date(name, new DateTime?(value), id, displayName, isRequired, labelOption, dateOptions);
        }

        public DateControl Date(Expression<Func<TModel, DateTime>> expression, DateOptions dateOptions = null)
        {
            var model = GetModel(expression);

            return new DateControl(model, dateOptions);
        }
    }
}