using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.AdditionalRenderingContext;
using DSP.Foundation.Aspects;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.Search.Modules.Search.Pagination
{
    public class PaginationRendering : RenderingModel<Pagination>, IHideOnError
    {
        private readonly IAdditionalContextStore _contextStore;

        public PaginationRendering(IAdditionalContextStore contextStore)
        {
            this._contextStore = contextStore;
        }

        protected override Pagination InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return new Pagination(_contextStore.Get<IPagingContextAspect>(), _contextStore.Get<IPagedResultsAspect>());
        }
    }
}