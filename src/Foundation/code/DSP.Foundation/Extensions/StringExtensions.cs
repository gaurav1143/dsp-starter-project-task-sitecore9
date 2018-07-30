using System;
using System.ComponentModel;
using System.Web;
using System.Web.Mvc;

namespace DSP.Foundation.Extensions
{
    public static class StringExtensions
    {
        public static IHtmlString ToHtmlString(this string value)
        {
            return new HtmlString(value ?? "");
        }

        public static MvcHtmlString ToMvcHtmlString(this string value)
        {
            return new MvcHtmlString(value ?? "");
        }

        public static T GetEnumValueFromDescription<T>(this string description)
        {
            var fieldInfo = typeof(T).GetFields();

            foreach (var fi in fieldInfo)
            {
                var attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attributes.Length > 0 && attributes[0].Description.Equals(description, StringComparison.InvariantCultureIgnoreCase))
                    return (T)Enum.Parse(typeof(T), fi.Name);
            }

            throw new Exception("Not found");
        }

        public static T ParseEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, ignoreCase: true);
        }
    }
}