namespace DSP.Business.Search.ContentSearch.SearchResults
{
    using System;

    using Sitecore.Data;

    public abstract class SearchResult : ISearchResult
    {
        public string Title { get; }
        public string Summary { get; }
        public string Url { get; }
        public DateTime Date { get; }
        public ID ItemId { get; }
        public ID TemplateId { get; }

        protected SearchResult(string title, string summary, string url, DateTime date, ID itemId, ID templateId)
        {
            this.Title = title;
            this.Summary = summary;
            this.Url = url;
            this.Date = date;
            this.ItemId = itemId;
            this.TemplateId = templateId;
        }

    }
}