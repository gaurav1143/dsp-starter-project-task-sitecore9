using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DSP.Foundation.AdditionalRenderingContext;
using DSP.Foundation.Aspects;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Containers.SearchContainer
{
    public class SearchContainerRendering : RenderingModel<SearchContainer>
    {
        private readonly IAdditionalContextStore additionalContextStore;

        public SearchContainerRendering(IAdditionalContextStore additionalContextStore)
        {
            this.additionalContextStore = additionalContextStore;
        }

        protected override SearchContainer InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return new SearchContainer
                         {
                             SearchTerm = this.additionalContextStore.Get<ISearchQueryAspect>()?.Query.Value
                         };
        }
    }
}