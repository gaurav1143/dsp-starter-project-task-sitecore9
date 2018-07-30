using DSP.Foundation.AdditionalRenderingContext;
using DSP.Foundation.Aspects;

namespace DSP.Feature.Search.Modules.Search.ResultsHeader
{
    using System;
    using System.Linq;
    using System.Web;

    using DeloitteDigital.Atlas;
    using DeloitteDigital.Atlas.Mvc;
    using DeloitteDigital.Atlas.Extensions;
    using DeloitteDigital.Atlas.Mvc.ErrorHandling;

    using Sitecore.Mvc.Presentation;

    using Constants = Business.Search.Constants;

    public class ResultsHeaderRendering : RenderingModel<ResultsHeader>, IHideOnError
    {
        private readonly IAdditionalContextStore contextStore;

        public ResultsHeaderRendering(IAdditionalContextStore contextStore)
        {
            this.contextStore = contextStore;
        }

        protected override ResultsHeader InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var vm = Map<ResultsHeader>(CurrentItem);

            // get the results numbers 
            var pagedRedultsAspect = contextStore.Get<IPagedResultsAspect>();
            vm.ResultsTotal = pagedRedultsAspect.ResultsTotal;
            vm.ResultPageTo = pagedRedultsAspect.PageNumber * pagedRedultsAspect.PageSize;
            vm.ResultPageFrom = vm.ResultPageTo - pagedRedultsAspect.PageSize + 1;
            if (vm.ResultPageTo > vm.ResultsTotal) vm.ResultPageTo = vm.ResultsTotal;

            // set paging related aspect
            var pagingContext = contextStore.Get<IPagingContextAspect>();
            if (pagingContext != null)
            {
                var largest = pagingContext.ValidPageSizes.Last();

                vm.ItemsPerPage =
                    pagingContext.ValidPageSizes.Select(x => new SelectOption
                    {
                        Value = x.ToString(),
                        Label = (x == largest && vm.ResultsTotal < largest) ? "View all" : x.ToString(),
                        IsSelected = pagingContext.PageSize.Value == x
                    });
            }

            // set sort order aspect
            var sortingContext = contextStore.Get<ISortingContextAspect>();
            vm.SortOrderOptions = sortingContext.SortOrderOptions.Select(x => new SelectOption
                {
                    Value = x.Key,
                    Label = x.Label,
                    IsSelected = (string.Equals(x.Key, sortingContext.SortBy.Value.Key, StringComparison.InvariantCultureIgnoreCase))
                });

            // set search context aspect
            var searchContext = contextStore.Get<IQueryStringContextAspect>();
            vm.FormBaseUrl = HttpContext.Current.Request.Url.AbsolutePath;
            vm.HiddenFields =
                searchContext.AsNameValueCollection()
                    .RemoveKey(Constants.SearchContext.Keys.Sort)
                    .RemoveKey(Constants.SearchContext.Keys.PageSize)
                    .RemoveKey(Constants.SearchContext.Keys.PageNumber);

            return vm;
        }
    }
}