using System;
using DeloitteDigital.Atlas.Extensions;

namespace DSP.Foundation.Extensions
{
    public static class EnumExtensions
    {
        /// <summary>
        /// Get the Description attribute value for the enum or the string representation if not found.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ToDescription(this Enum value)
        {
            var desc = value.ToDescriptionString();
            return string.IsNullOrWhiteSpace(desc)
                ? value.ToString("G")
                : desc;
        }
    }
}
