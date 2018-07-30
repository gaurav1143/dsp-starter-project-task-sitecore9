namespace DSP.Business.Search.ComputedFields.IndexValueProviders
{
    using DSP.Business.Search.ComputedFields.Extensions;

    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.ContentSearch;
    using Sitecore.Data;
    using Sitecore.Data.Items;

    public class ItemProvider
    {
        /// <summary>
        /// Get the content or media Item of this indexable, or null if not found.
        /// </summary>
        /// <param name="indexable"></param>
        /// <returns></returns>
        public static Item Get(IIndexable indexable)
        {
            var item = indexable.ToItem();

            if (item == null) return null;
            if (item.IsNotMasterOrWebIndex()) return null;
            if (!item.IsContentOrMediaItem()) return null;

            return item;
        }

        /// <summary>
        /// Get the content or media Item of this indexable that inherits the template, or null if not found.
        /// </summary>
        /// <param name="indexable"></param>
        /// <param name="templateId"></param>
        /// <returns></returns>
        public static Item Get(IIndexable indexable, TemplateID templateId)
        {
            var item = Get(indexable);

            if (!item.InheritsFromTemplate(templateId)) return null;

            return item;
        }
    }
}
