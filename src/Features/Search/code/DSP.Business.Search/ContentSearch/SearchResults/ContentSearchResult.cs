namespace DSP.Business.Search.ContentSearch.SearchResults
{
    using System;
    using System.Collections.Generic;

    using Tags;

    using Sitecore.Data;
    using Sitecore.Data.Items;

    public class ContentSearchResult : SearchResult
    {        
        public IEnumerable<ContentTag> Tags { get; private set; }

        public MediaItem FeatureImage { get; private set; } 

        public ContentSearchResult(string title, string summary, string url, DateTime date, ID itemId, ID templateId, IEnumerable<ContentTag> tags, MediaItem featureImage) : 
            base(title, summary, url, date, itemId, templateId)
        {
            this.Tags = tags;
            this.FeatureImage = featureImage;
        }
        
    }
}
