using System.Collections.Generic;
using System.Linq;
using DSP.Business.Search.Filters;
using DSP.Business.Search.Predicates;
using DSP.Business.Search.SearchContext;
using Sitecore.ContentSearch.Linq;
using Sitecore.Data;
using Sitecore.Sites;

namespace DSP.Business.Search.ContentSearch
{
    public class SearchContextFilterBuilder
    {
        public IQueryable<T> Build<T>(IQueryable<T> query, ISearchContext context, SiteContext siteContext, bool isCollectionSearch)
            where T : LuceneSearchResultItem
        {
            query = AddCollectionSource(query, context.Path.Value, siteContext, isCollectionSearch);
            query = AddExcludedTags(query, context.ExcludedFacetValues.Value);
            query = AddExcludedItems(query, context.ExcludedItemIds.Value);
            query = AddFeatured(query, context.Featured.Value);
            query = AddTemplates(query, context.SelectedTemplateIds.Value);

            return query;
        }

        private static IQueryable<T> AddExcludedTags<T>(IQueryable<T> query, IEnumerable<string> value) 
            where T : LuceneSearchResultItem
        {
            if (value == null) return query;

            var values = value.ToList();

            if (!values.Any()) return query;

            query = 
                query.AddFilter(
                    new AndAllAggregateFilter<T>(values.Select(s => new ExcludeContentTagFilter<T>(s))));

            query =
                query.AddFilter(
                    new AndAllAggregateFilter<T>(values.Select(s => new ExcludeAutomatedTagFilter<T>(s))));

            return query;
        }

        private static IQueryable<T> AddExcludedItems<T>(IQueryable<T> query, IEnumerable<ID> value)
             where T : LuceneSearchResultItem
        {
            if (value == null) return query;

            var values = value.ToList();

            if (!values.Any()) return query;

            return query.AddFilter(new AndAllAggregateFilter<T>(values.Select(id => new ExcludeItemFilter<T>(id))));
        }

        private static IQueryable<T> AddFeatured<T>(IQueryable<T> query, FeaturedOption value)
             where T : LuceneSearchResultItem
        {
            switch (value)
            {
                case FeaturedOption.Both: return query;
                case FeaturedOption.Yes: return query.Filter(item => item.IsFeatured);
                case FeaturedOption.No: return query.Filter(item => !item.IsFeatured);
                default: return query;
            }
        }

        private static IQueryable<T> AddTemplates<T>(IQueryable<T> query, IEnumerable<ID> selectedTemplateIds)
             where T : LuceneSearchResultItem
        {
            if (selectedTemplateIds == null) return query;

            var values = selectedTemplateIds.ToList();

            if (!values.Any()) return query;

            return query.AddFilter(
                    new OrAnyAggregateFilter<T>(values.Select(s => new TemplateFilter<T>(s))));
        }

        private static IQueryable<T> AddCollectionSource<T>(IQueryable<T> query, ID path, SiteContext siteContext, bool isCollectionSearch)
             where T : LuceneSearchResultItem
        {
            // TODO: this is messy. "collection search" searches under a specific item
            // Sitesearch searches under Content and Media for the site.
            // Collection source should then be ID[] locations and not use a flag?
            if (isCollectionSearch)
            {
                // assign filter based on whether this is a scoped collection search or not
                // if search location not provided use current item
                if (path == ID.Null) path = Sitecore.Context.Item.ID;

                query = query.AddFilter(new CollectionFilter<T>(path));
            }
            else
            {
                if (path == ID.Null)
                {
                    // no Path specified - search the whole site (Content and Media)
                    query = query.AddFilter(new DefaultFilter<T>(siteContext));
                }
                else
                {
                    // path was specified - search under the path
                    query = query.AddFilter(new CollectionFilter<T>(path));
                }
            }

            return query;
        }
    }
}
