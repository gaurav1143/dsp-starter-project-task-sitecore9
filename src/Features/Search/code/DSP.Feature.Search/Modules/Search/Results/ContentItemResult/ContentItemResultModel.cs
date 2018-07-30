namespace DSP.Feature.Search.Modules.Search.Results.ContentItemResult
{
    using System.Collections.Generic;
    using DefaultResult;
    using Sitecore.Data.Items;
    using Tags;

    public class ContentItemResultModel : DefaultResultModel
    {
        public MediaItem FeatureImage { get; set; }

        public IEnumerable<Tag> Tags { get; set; } 
    }
}