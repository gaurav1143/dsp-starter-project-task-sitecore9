namespace DSP.Business.Search.ComputedFields.Extensions
{
    using System;

    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.ContentSearch;
    using Sitecore.Data.Items;

    public static class ComputedFieldExtensions
    {
        public static bool IsNotMasterOrWebIndex(this Item item)
        {
            return !(item.Database.Name.Equals("master", StringComparison.OrdinalIgnoreCase)
                     || item.Database.Name.Equals("web", StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Get the indexable value as a sitecore item or null
        /// </summary>
        /// <param name="indexable"></param>
        /// <returns></returns>
        public static Item ToItem(this IIndexable indexable)
        {
            var item = (indexable as SitecoreIndexableItem);
            // item might be null
            return item;
        }

        /// <summary>
        /// Return null if a string value is empty or whitespace.
        /// </summary>
        /// <remarks>
        /// Returning null causes this field to not be added to the lucene index at all.
        /// </remarks>
        public static string ToValueOrNull(this string value)
        {
            return (string.IsNullOrWhiteSpace(value))
                ? null
                : value;
        }

        public static bool IsContentOrMediaItem(this Item item)
        {
            if (item == null) return false;

            if (item.IsMediaItem()) return true;

            return item.Paths.IsContentItem;
        }        

    }
}
