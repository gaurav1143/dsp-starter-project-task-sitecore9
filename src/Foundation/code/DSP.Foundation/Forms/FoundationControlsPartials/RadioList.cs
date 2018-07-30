using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public RadioCheckBoxListControl<object> RadioList(string name, IEnumerable<SelectListItem> items, string value = null, string id = "",
                string displayName = null, bool isRequired = false, bool isHorizontal = false, LabelOption labelOption = LabelOption.None)
        {
            var model = new ControlModel<object>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            return new RadioCheckBoxListControl<object>(model, items, "radio", isHorizontal);
        }

        public RadioCheckBoxListControl<TProperty> RadioList<TProperty>(Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> items,
             bool isHorizontal = false, string displayName = null)
        {
            var model = GetModel(expression);

            if (!string.IsNullOrEmpty(displayName))
                model.DisplayName = displayName;

            return new RadioCheckBoxListControl<TProperty>(model, items, "radio", isHorizontal);
        }
    }
}