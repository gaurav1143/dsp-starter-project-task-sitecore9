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
        public SelectControl<object> Select(string name, IEnumerable<SelectListItem> items, string value = null, string id = "",
                  string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None)
        {
            var model = new ControlModel<object>(id, name, value, displayName ?? GetDisplayName(name, name), labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            return new SelectControl<object>(model, items);
        }

        public SelectControl<TProperty> Select<TProperty>(Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> items)
        {
            var model = GetModel(expression);

            return new SelectControl<TProperty>(model, items);
        }
    }
}