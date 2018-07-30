using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.Controls;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        public HierarchicalCheckBoxControl<object[]> HierarchicalCheckBoxList(string name,
            IEnumerable<HierarchicalCheckBoxListItem> items, object[] value = null, string id = "",
            string displayName = null, bool isRequired = false, LabelOption labelOption = LabelOption.None, bool isDisabled = false)
        {
            var model = new ControlModel<object[]>(id, name, value, displayName ?? GetDisplayName(name, name),
                labelOption: labelOption);

            model = ApplyRequiredRule(model, isRequired);

            return new HierarchicalCheckBoxControl<object[]>(model, items, isDisabled);
        }

        public HierarchicalCheckBoxControl<TProperty> HierarchicalCheckBoxList<TProperty>(
            Expression<Func<TModel, TProperty>> expression, IEnumerable<HierarchicalCheckBoxListItem> items, bool isDisabled = false)
            where TProperty : IEnumerable
        {
            var model = GetModel(expression);

            return new HierarchicalCheckBoxControl<TProperty>(model, items, isDisabled);
        }
    }

    public class HierarchicalCheckBoxListItem
    {
        public HierarchicalCheckBoxListItem()
        {
            Children = Enumerable.Empty<HierarchicalCheckBoxListItem>();
        }

        public string Text { get; set; }

        public string Value { get; set; }

        public bool Selected { get; set; }

        public string ParentId { get; set; }

        public IEnumerable<HierarchicalCheckBoxListItem> Children { get; set; }
    }

    public class HierarchicalCheckBoxList
    {
        public HierarchicalCheckBoxList()
        {
            HierarchicalCheckBoxListItems = new List<HierarchicalCheckBoxListItem>();
        }

        public List<HierarchicalCheckBoxListItem> HierarchicalCheckBoxListItems { get; set; }
    }
}