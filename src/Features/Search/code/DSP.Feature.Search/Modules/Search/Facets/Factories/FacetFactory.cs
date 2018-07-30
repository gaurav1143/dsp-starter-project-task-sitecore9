using DSP.Foundation.Extensions;

namespace DSP.Feature.Search.Modules.Search.Facets.Factories

{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Collections.Specialized;

    using DeloitteDigital.Atlas.Extensions;
    using Business.Search;
    using Business.Search.Facets;
    using Business.Search.SearchContext;
    using Business.Search.Tags;

    using Sitecore.Data;
    using Sitecore.Data.Items;

    public class FacetFactory
    {
        private readonly TagRepository tagRepository;
        private List<string> selectedFacetValues;
        private List<Facet<IFacetable>> resultSetFacets;

        public FacetFactory(TagRepository tagRepository)
        {
            this.tagRepository = tagRepository;
        }

        public IEnumerable<Facet> Create(ISearchContext searchContext, IEnumerable<Facet<IFacetable>> resultFacets)
        {
            var facetCategoryItems = searchContext.CollectionSettings.CollectionFacets ?? Enumerable.Empty<Item>();
            selectedFacetValues = searchContext.SelectedFacetValues.Value.ToList();
            resultSetFacets = resultFacets.ToList();

            var facets = new List<Facet>();

            foreach (var facetCategory in facetCategoryItems)
            {
                if (facetCategory.TemplateID == ID.Parse(SitecoreTemplates.Automated_Tag.TemplateId))
                {
                    var tag = tagRepository.GetAutomatedTag(facetCategory.ID);
                    var f = CreateFromAutomatedTag(searchContext, tag);
                    if (f.Children != null && f.Children.Any())
                        facets.Add(f);
                }
                if (facetCategory.TemplateID == ID.Parse(SitecoreTemplates.Content_Tag.TemplateId))
                {
                    // get the tag category and all it's descendants (children, grandchildren etc).
                    var tag = tagRepository.GetRecursive(facetCategory.ID);
                    var f = CreateFromContentTag(searchContext, tag);
                    if (f.Children != null && f.Children.Any())
                        facets.Add(f);
                }
            }
            return facets;
        }

        private Facet CreateFromAutomatedTag(ISearchContext searchContext, AutomatedTag tag)
        {
            var f = new Facet(tag, "", IsSelected(tag.Value));
            // TODO this logic needs to be pushed into the automated tag implementation to be more flexible, e.g. sorting might be different per tag (year -> desc)

            var children =
                resultSetFacets.Where(facet => facet.Item.Id.Equals(tag.Id))
                    .Select(
                        facet =>
                        new Facet(
                            facet.Item,
                            GetChildQueryString(searchContext, searchContext.AsNameValueCollection(), facet.Item),
                            IsSelected(facet.Item.Value),
                            facet.Count,
                            null))
                    .OrderBy(facet => facet.Title);
            f.SetChildren(children);
            return f;
        }

        private Facet CreateFromContentTag(ISearchContext searchContext, ContentTag tag)
        {
            var queryString = searchContext.AsNameValueCollection();
            var f = new Facet(tag, "", IsSelected(tag.Value));
            // recursively set children
            f.SetChildren(GetChildren(searchContext, queryString, tag.Children));
            return f;
        }

        private IEnumerable<Facet> GetChildren(ISearchContext searchContext, NameValueCollection queryString, IEnumerable<ContentTag> tags)
        {
            return tags
                .Where(t => !t.IsHiddenFromFacet)
                .Where(t => IsUsedInResultSet(t.Id))
                .Where(t => tags.Any(x => IsSelected(x.Value)) ? IsSelected(t.Value) : true)
                .Select(t => new Facet(
                           t,
                           GetChildQueryString(searchContext, queryString, t),
                           IsSelected(t.Value),
                           GetTagFacetCount(t.Id),
                           // and recurse
                           GetChildren(searchContext, queryString, t.Children)));
        }

        private bool IsUsedInResultSet(ID value)
        {
            return resultSetFacets.Any(x => x.Item.Id.Equals(value));
        }

        private int GetTagFacetCount(ID id)
        {
            return resultSetFacets.FirstOrDefault(f => f.Item.Id.Equals(id))?.Count ?? 0;
        }

        private bool IsSelected(string value)
        {
            return selectedFacetValues.Contains(value, StringComparer.OrdinalIgnoreCase);
        }

        private string GetChildQueryString(ISearchContext searchContext, NameValueCollection queryString, IFacetable facet)
        {
            // if facet is already selected then remove it (and any descendants)
            if (IsSelected(facet.Value))
            {
                return GetUnselectFacetUrl(searchContext, queryString, facet);
            }

            // add facet to selected
            var tags = new List<string>(selectedFacetValues) { facet.Value };

            return queryString
                      .SetKey(Constants.SearchContext.Keys.Facets, searchContext.FacetValuesToString(tags))
                      // go back to first page of results
                      .RemoveKey(Constants.SearchContext.Keys.PageNumber)
                      .ToQueryString(true);
        }

        private string GetUnselectFacetUrl(ISearchContext searchContext, NameValueCollection queryString, IFacetable facet)
        {
            var facetsToRemove = FindValueAndDescendantValues(facet);

            return
              queryString
                  .SetKey(Constants.SearchContext.Keys.Facets, searchContext.FacetValuesToString(selectedFacetValues.Except(facetsToRemove)))
                  // go back to first page of results
                  .RemoveKey(Constants.SearchContext.Keys.PageNumber)
                  .ToQueryString(true);
        }

        private static IEnumerable<string> FindValueAndDescendantValues(IFacetable facet)
        {
            yield return facet.Value;

            var tag = facet as ContentTag;

            if (tag == null) yield break;

            foreach (var child in tag.Children.FlattenRecursive(t => t.Children))
            {
                yield return child.Value;
            }
        }
    }
}