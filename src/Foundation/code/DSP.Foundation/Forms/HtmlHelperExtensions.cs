using System.Collections.Generic;
using System.Web.Mvc;
using DSP.Foundation.SitecoreAbstractions;
using DSP.Foundation.Forms;
using DSP.Foundation.Forms.DisplayName;

namespace DSP.Foundation.Forms
{
    public static class HtmlHelperExtensions
    {
        private static readonly IDisplayNameProvider DisplayNameProvider;

        static HtmlHelperExtensions()
        {
            DisplayNameProvider = DependencyResolver.Current.GetService<IDisplayNameProvider>();
        }

        public static FoundationControl<T> Foundation<T>(this HtmlHelper<T> html)
        {
            return new FoundationControl<T>(DisplayNameProvider, html, DependencyResolver.Current.GetService<ISitecoreContext>());
        }

        public static IDictionary<string, object> Merge(this IDictionary<string, object> attributes, string key, object value)
        {
            object temp;

            attributes[key] = attributes.TryGetValue(key, out temp)
                ? $"{temp} {value}"
                : $"{value}";

            return attributes;
        }
    }
}