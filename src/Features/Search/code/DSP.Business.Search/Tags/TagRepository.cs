using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas.Caching;

namespace DSP.Business.Search.Tags
{
    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.Data;
    using Sitecore.Data.Items;

    public class TagRepository
    {
        private readonly ICacheService cacheService;

        public TagRepository(ICacheService cache)
        {
            cacheService = cache;
        }

        /// <summary>
        /// Get all Tags as a flat list.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ContentTag> Get()
        {
            var cachekey = "DSP.Business.Search.Tags.TagRepository.AllTags";
            return cacheService.CreateOrGet(cachekey, () =>
            {
                // TODO: this path should not be hardcoded here. 
                var tagFolder = Sitecore.Context.Database.GetItem("/sitecore/content/dspstarter/Configuration/Tags/Content Tags");

                return tagFolder
                    .GetDescendantsThatInheritTemplate(new TemplateID(ID.Parse(SitecoreTemplates.Content_Tag.TemplateId)))
                    .Select(ToContentTag)
                    .ToList();
            });
        }


        /// <summary>
        /// Get a Tag with NO children.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ContentTag Get(ID id)
        {
            var tags = Get();

            return tags.FirstOrDefault(tag => tag.Id == id);
        }

        /// <summary>
        /// Get the Tag and all it's descedant children in a tree structure. Note this value is cached.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ContentTag GetRecursive(ID id)
        {
            var cachekey = string.Format("DSP.Business.Search.Tags.TagRepository.Recursive.{0}", id.ToShortID());

            return cacheService.CreateOrGet(cachekey, () =>
            {
                var item = Sitecore.Context.Database.GetItem(id);

                if (item == null) return null;

                var tag = ToContentTag(item);

                tag.SetChildren(item.Children.Select(child => ToContentTagRecursive(tag, child)));

                return tag;
            });
        }

        public IEnumerable<ContentTag> Get(IEnumerable<ID> tagIds)
        {
            return tagIds == null
                ? Enumerable.Empty<ContentTag>()
                : tagIds.Select(Get).Where(tag => tag != null);
        }

        public IEnumerable<AutomatedTag> GetAutomatedTags()
        {
            var cachekey = string.Format("DOH.Business.Tags.Repository.AutomatedTags");

            return cacheService.CreateOrGet(cachekey, () =>
            {
                // TODO: this path should not be hardcoded here. 
                var tagFolder = Sitecore.Context.Database.GetItem("/sitecore/content/dspstarter/Configuration/Tags/Automated Tags");

                return tagFolder
                    .GetDescendantsThatInheritTemplate(new TemplateID(ID.Parse(SitecoreTemplates.Automated_Tag.TemplateId)))
                    .Select(ToAutomatedTag)
                    .ToList();
            });

        }

        public AutomatedTag GetAutomatedTag(ID id)
        {
            return GetAutomatedTags().FirstOrDefault(tag => tag.Id == id);
        }

        private static ContentTag ToContentTag(Item item)
        {
            return new ContentTag(
                null,
                item.ID,
                item.GetFieldValue(DSP.Foundation.SitecoreTemplates.Title_Required.Title.FieldName),
                item.IsChecked(SitecoreTemplates.Content_Tag.HideFromDisplay.FieldName),
                item.IsChecked(SitecoreTemplates.Content_Tag.HideFromFacet.FieldName),
                item.TemplateID);
        }

        private static ContentTag ToContentTagRecursive(ContentTag parent, Item item)
        {
            var tag = new ContentTag(
                parent,
                item.ID,
                item.GetFieldValue(DSP.Foundation.SitecoreTemplates.Title_Required.Title.FieldName),
                item.IsChecked(SitecoreTemplates.Content_Tag.HideFromDisplay.FieldName),
                item.IsChecked(SitecoreTemplates.Content_Tag.HideFromFacet.FieldName),
                item.TemplateID);
            tag.SetChildren(item.Children.Select(child => ToContentTagRecursive(tag, child)));

            return tag;
        }

        private static AutomatedTag ToAutomatedTag(Item item)
        {
            return new AutomatedTag(item.ID, "", item.GetFieldValue(DSP.Foundation.SitecoreTemplates.Title.Title_Field.FieldName));
        }
    }
}
