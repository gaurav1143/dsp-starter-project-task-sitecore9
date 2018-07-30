namespace DSP.Business.Search.ContentSearch.SearchResults
{
    using System;
    using Sitecore.Data;

    public interface ISearchResult
    {
        string Title { get; }
        string Summary { get; }
        string Url { get; }
        DateTime Date { get; }
        ID ItemId { get; }
        ID TemplateId { get; }
    }
}