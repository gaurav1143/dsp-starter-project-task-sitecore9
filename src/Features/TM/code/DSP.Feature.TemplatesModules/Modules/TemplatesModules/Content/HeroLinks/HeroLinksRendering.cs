using System.Linq;
using DSP.Business.Search.Tags;
using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Extensions;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroLinks
{
    public class HeroLinksRendering : RenderingModel<HeroLinks>, IHideOnError
    {
        private readonly TagRepository _tagRepository;

        public HeroLinksRendering(TagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        protected override HeroLinks InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var contextItem = dataSource?.Item ?? CurrentItem;
            // map data source and selected news items
            var vm = Map<HeroLinks>(contextItem);
            
            // set the tag value
            var taxonomy = contextItem.GetFieldValueAsItem(SitecoreTemplates.Hero_Links_Item.TaxonomyParent.FieldName);
            if (taxonomy == null) return vm;
            var taxonomyTag = _tagRepository.GetRecursive(taxonomy.ID);
            foreach (var heroLinksItem in vm.HeroLinksItems)
            {
                heroLinksItem.ContentType =
                    taxonomyTag.Children.FirstOrDefault(
                        t => !t.IsHiddenFromDisplay && heroLinksItem.ContentTags.Contains(t.Id.ToString()))?.Title;
            }
            return vm;
        }
    }
}