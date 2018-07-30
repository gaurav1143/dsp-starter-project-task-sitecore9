using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.ComputedFields.IndexValueProviders
{
    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.ContentSearch;
    using Sitecore.Data;
    using Sitecore.Data.Fields;
    using Sitecore.Data.Items;

    /// <summary>
    /// Get all Content tag IDs and their parents for this item.
    /// </summary>
    /// <remarks>
    /// This value provider will grab all the tags of an an item, then each walk up the parent tags.
    /// All the tags found are accumulated into a set of ID's and returned.
    /// If the parent does not inherit from "Base Tag" then the recursion will stop.
    /// </remarks>
    public class HierarchicalContentTagsIdIndexValueProvider
    {
        public IEnumerable<ID> GetValue(IIndexable indexable, string fieldName)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            return GetValue(item, fieldName);
        }

        public IEnumerable<ID> GetValue(Item item, string fieldName)
        {

            if (item == null) return null;

            var tags = (MultilistField)item.Fields[fieldName];

            if (tags == null) return null;

            var contentDb = item.Database;
            var tagItems = new List<Item>(256);

            foreach (var tagId in tags.TargetIDs)
            {
                var tagItem = contentDb.GetItem(tagId);

                if (tagItem == null) continue;

                PopulateTagIds(tagItems, tagItem);
            }

            return tagItems.Select(t => t.ID);
        }

        protected virtual void PopulateTagIds(List<Item> tagItemIds, Item tagItem)
        {
            // avoid recursion and any possible stackoverflow
            while (true)
            {
                if (tagItem == null) return;
                // if we have already add this tag to the set then get out
                if (tagItemIds.Contains(tagItem)) return;
                // if we hit a tag folder then get out
                if (tagItem.TemplateID == ID.Parse(DSP.Foundation.SitecoreTemplates.Tag_Folder.TemplateId)) return;
                // if this is not a tag then get out
                if (!tagItem.InheritsFromTemplate(ID.Parse(DSP.Foundation.SitecoreTemplates.Base_Tag.TemplateId))) return;

                tagItemIds.Add(tagItem);

                tagItem = tagItem.Parent;
            }
        }



    }
}
