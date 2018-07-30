namespace DSP.Business.Search.ContentSearch.SearchResults
{
    using System;

    using Sitecore.Data;

    public class MediaItemSearchResult : SearchResult
    {        
        public string FileType { get; }

        public string SizeInByte { get; }

        public MediaItemSearchResult(string title, string summary, string url, DateTime date, ID itemId, ID templateId, string fileType, string size)
            : base(title, summary, url, date, itemId, templateId)
        {
            this.FileType = fileType;
            this.SizeInByte = size;
        }
    }
}