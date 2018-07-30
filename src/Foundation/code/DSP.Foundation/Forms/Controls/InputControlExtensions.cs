using System;
using System.Collections.Generic;
using System.Web;
using HtmlTags;
using DSP.Foundation.Forms.Includes;

namespace DSP.Foundation.Forms.Controls
{
    public static class InputControlExtensions
    {
        public static IInputControl Placeholder(this IInputControl control, string value)
        {
            Find(control.Inner, "input").Attr("placeholder", value);
            return control;
        }

        public static TextAreaControl<TProperty> Placeholder<TProperty>(this TextAreaControl<TProperty> control, string value)
        {
            Find(control.Inner, "textarea").Attr("placeholder", value);
            return control;
        }

        public static DateControl Placeholder(this DateControl control, string value)
        {
            var inner = Find(control.Inner, "input");

            inner.Attr("placeholder", value);
            inner.Data("placeholder", value);

            return control;
        }

        public static IInputControl Tooltip(this IInputControl control, string value)
        {
            // find the label and append 
            Find(control.Inner, "label").AppendHtml(new Tooltip(value).ToString());
            return control;
        }

        public static RadioCheckBoxListControl<TProperty> Tooltip<TProperty>(this RadioCheckBoxListControl<TProperty> control, string value)
        {
            // find the label and append 
            Find(control.Inner, "span", "label").AppendHtml(new Tooltip(value).ToString());
            return control;
        }

        public static IInputControl Tooltip(this IInputControl control, IHtmlString value)
        {
            // find the label and append 
            Find(control.Inner, "label").AppendHtml(new Tooltip(value).ToString());
            return control;
        }

        public static RadioCheckBoxListControl<TProperty> Tooltip<TProperty>(this RadioCheckBoxListControl<TProperty> control, IHtmlString value)
        {
            // find the label and append 
            Find(control.Inner, "span", "label").AppendHtml(new Tooltip(value).ToString());
            return control;
        }

        public static RadioCheckBoxListControl<TProperty> Help<TProperty>(this RadioCheckBoxListControl<TProperty> control, string value)
        {
            // find the label and append 
            Find(control.Inner, "span", "label").AppendHtml(new HelpText(value).ToString());
            return control;
        }

        public static IInputControl Help(this IInputControl control, string value)
        {
            // find the label and append 
            Find(control.Inner, "label").AppendHtml(new HelpText(value).ToString());
            return control;
        }

        public static TextAreaControl<TProperty> Help<TProperty>(this TextAreaControl<TProperty> control, string value)
        {
            // textarea append the help after the textarea and not on the label

            // find the label and append 
            Find(control.Inner, "div", "ctrl").AppendHtml(new HelpText(value).ToString());
            return control;
        }

        public static IInputControl Attributes(this IInputControl control, IDictionary<string, object> attributes)
        {
            var inner = Find(control.Inner, "input");

            foreach (var attribute in attributes)
            {
                inner.Attr(attribute.Key, attribute.Value);
            }

            return control;
        }

        public static IInputControl Attributes(this IInputControl control, string tagName, IDictionary<string, object> attributes)
        {
            var inner = Find(control.Inner, tagName);

            foreach (var attribute in attributes)
            {
                inner.Attr(attribute.Key, attribute.Value);
            }

            return control;
        }

        public static IInputControl Attribute(this IInputControl control, string tagName, string name, object value)
        {
            Find(control.Inner, tagName).Attr(name, value);
            return control;
        }

        public static IInputControl Attribute(this IInputControl control, string name, object value)
        {
            Find(control.Inner, "input").Attr(name, value);
            return control;
        }

        public static IInputControl AddClass(this IInputControl control, string tagName, string className)
        {
            Find(control.Inner, tagName).AddClass(className);
            return control;
        }

        public static IInputControl AddClass(this IInputControl control, string className)
        {
            control.Inner.AddClass(className);

            return control;
        }

        public static IInputControl DisableIf(this IInputControl control, Func<bool> disable)
        {
            var isDisabled = disable?.Invoke() ?? false;

            if (isDisabled) Find(control.Inner, "input").Attr("readonly", "readonly");

            return control;
        }

        public static IInputControl DisableIf(this IInputControl control, bool disable)
        {
            if (disable) Find(control.Inner, "input").Attr("readonly", "readonly");

            return control;
        }

        private static HtmlTag Find(HtmlTag parent, string tagName)
        {
            if (parent.TagName().Equals(tagName, StringComparison.OrdinalIgnoreCase)) return parent;

            foreach (var child in parent.Children)
            {
                if (child.TagName().Equals(tagName, StringComparison.OrdinalIgnoreCase)) return child;

                var candidate = Find(child, tagName);

                if (candidate != null) return candidate;
            }

            return null;
        }

        private static HtmlTag Find(HtmlTag parent, string tagName, string className)
        {
            if (parent.TagName().Equals(tagName, StringComparison.OrdinalIgnoreCase)
                && parent.HasClass(className))
            {
                return parent;
            }

            foreach (var child in parent.Children)
            {
                if (child.TagName().Equals(tagName, StringComparison.OrdinalIgnoreCase) && parent.HasClass(className)) return child;

                var candidate = Find(child, tagName);

                if (candidate != null) return candidate;
            }

            return null;
        }
    }
}