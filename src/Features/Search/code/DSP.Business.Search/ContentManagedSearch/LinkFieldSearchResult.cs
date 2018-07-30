using System;
using DSP.Business.Search.ContentSearch.SearchResults;
using Sitecore.Data;
using Sitecore.Data.Fields;

namespace DSP.Business.Search.ContentManagedSearch
{
    public class LinkFieldSearchResult : ISearchResult
    {
        public LinkFieldSearchResult(LinkField link)
        {
            // use Text for the title as this aligns with the ILinkFieldRenderingString implementation
            Title = string.IsNullOrWhiteSpace(link.Text) ? link.Url : link.Text;
            // link.Title is AltText
            Summary = link.Title ?? "";
            Url = link.Url;
            ItemId = ID.Null;
            TemplateId = ID.Null;
            Date = DateTime.MinValue;
        }

        public string Title { get; }
        public string Summary { get; }
        public string Url { get; }
        public DateTime Date { get; }
        public ID ItemId { get; }
        public ID TemplateId { get; }
    }
}