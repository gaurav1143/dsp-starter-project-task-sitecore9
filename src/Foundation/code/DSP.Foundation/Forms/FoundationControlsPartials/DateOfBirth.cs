using System;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public DateofBirthControl DateOfBirth(string name, DateTime? value = null, string id = "",
            string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None)
        {
            var model = new ControlModel<DateTime?>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            return new DateofBirthControl(model);
        }

        public DateofBirthControl DateOfBirth(Expression<Func<TModel, DateTime?>> expression)
        {
            var model = GetModel(expression);

            return new DateofBirthControl(model);
        }

        public DateofBirthControl DateOfBirth(string name, DateTime value, string id = "",
            string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None)
        {
            return DateOfBirth(name, new DateTime?(value), id, displayName, isRequired, labelOption);
        }

        public DateofBirthControl DateOfBirth(Expression<Func<TModel, DateTime>> expression)
        {
            var model = GetModel(expression);

            return new DateofBirthControl(model);
        }
    }
}