using System.Collections.Generic;
using System.Text;
using DeloitteDigital.Atlas.Mapping;
using DSP.Foundation.DependencyInjection;
using Sitecore.DependencyInjection;

namespace DSP.Business.Search.SearchContext
{
    using System.Linq;
    using System.Web;

    using Sorting.SortOptions;

    using DeloitteDigital.Atlas.Extensions;    

    using Sitecore.Data.Items;

    public static class SearchContextExtensions
    {
        private const string CacheKey = "DSP.Business.Search.ISearchContext";

        public static ISearchContext SearchContext(this HttpContextBase context)
        {
            return SearchContext(context, Sitecore.Context.Item);
        }

        public static ISearchContext SearchContext(this HttpContextBase context, Item dataSource)
        {
            return context.CreatePerRequest(CacheKey, () =>
            {
                // only instantiate one searchContext per request                
                var mapper = ServiceLocator.ServiceProvider.GetService<IItemMapper>();
                var sortOptionRepository = ServiceLocator.ServiceProvider.GetService<ISortOptionRepository>();
                var settings = mapper.Map<CollectionSettings>(dataSource);

                // set non-mapped fields
                settings.CollectionFacets = dataSource.GetListFieldValueItems(DSP.Foundation.SitecoreTemplates.Has_Collection_Facets.CollectionFacets.FieldName).ToList();
                settings.CollectionSource = dataSource.GetFieldValueAsItem(DSP.Foundation.SitecoreTemplates.Collection_Source.CollectionSource.FieldName);

                var facetValueValidator = ServiceLocator.ServiceProvider.GetService<FacetValueValidator>();

                return new HttpRequestSearchContext(context.Request, facetValueValidator, settings, sortOptionRepository);
            });
        }
        
        public static string GetValueOrDefault(this IDictionary<string, string> values, string key, string defaultValue = "")
        {
            string tmp;
            values.TryGetValue(key, out tmp);
            return tmp ?? defaultValue;
        }

        public static string FacetValuesToString(this ISearchContext searchContext, IEnumerable<string> facetValues)
        {
            var result = new StringBuilder();
            var delimiter = "";

            foreach (var facetValue in facetValues)
            {
                result.AppendFormat("{0}{1}", delimiter, facetValue);
                delimiter = Constants.SearchContext.Delimiter;
            }

            return result.ToString();
        }
    }
}
