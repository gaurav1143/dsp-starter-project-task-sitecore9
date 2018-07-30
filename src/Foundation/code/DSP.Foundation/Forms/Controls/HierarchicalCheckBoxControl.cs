using HtmlTags;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms.Controls
{
    public class HierarchicalCheckBoxControl<TProperty> : IInputControl
        where TProperty : IEnumerable
    {
        public HierarchicalCheckBoxControl(ControlModel<TProperty> model,
            IEnumerable<HierarchicalCheckBoxListItem> items, bool isDisabled)
        {
            Inner = new HtmlTag("div").AddClass("js-hierarchical-checkboxes");

            BuildCheckbox(Inner, items, model, isDisabled, 1);
        }

        public string ToHtmlString()
        {
            return Inner.ToHtmlString();
        }

        public string ToPrettyString()
        {
            return Inner.ToPrettyString();
        }

        public HtmlTag Inner { get; }

        private static void BuildCheckbox(HtmlTag currentParent, IEnumerable<HierarchicalCheckBoxListItem> options,
            ControlModel<TProperty> model, bool isDisabled, int level)
        {
            foreach (var option in options)
            {
                var selectListItem = new SelectListItem
                {
                    Text = option.Text,
                    Value = option.Value,
                    Selected = option.Selected
                };

                var divCtrlHolder = new ControlHolder().Append(new HtmlTag("span").AddClass("label")).Id(selectListItem.Value);
                var divOption = new HtmlTag("div", tag => tag.AddClass("option"));

                divOption.Append(new HierarchicalCheckboxItem<TProperty>(model, selectListItem, isDisabled));
                divOption.After(new StatusMessage());
                divCtrlHolder.Append(divOption.WrapWith(new ControlWrapper()));

                currentParent.Append(divCtrlHolder);

                if (!option.Children.Any()) continue;

                level++;

                var divChildrenHolder = new HtmlTag("div").AddClass($"ctrl-lvl-{level}");

                currentParent.Append(divChildrenHolder);

                BuildCheckbox(divChildrenHolder, option.Children, model, isDisabled, level);
            }
        }

        public override string ToString()
        {
            return Inner.ToString();
        }
    }
}