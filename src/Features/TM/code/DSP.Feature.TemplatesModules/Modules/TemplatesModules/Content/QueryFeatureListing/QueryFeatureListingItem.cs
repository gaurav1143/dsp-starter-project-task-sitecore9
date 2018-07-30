using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DSP.Business.Search.Tags;
using Sitecore.Data.Items;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.QueryFeatureListing
{
    public class QueryFeatureListingItem
    {
        public QueryFeatureListingItem()
        {
            Tags = Enumerable.Empty<ContentTag>();
        }

        public IHtmlString Title { get; set; }
        public DateTime? Time { get; set; }
        public IHtmlString Description { get; set; }
        public string Link { get; set; }
        public IEnumerable<ContentTag> Tags { get; set; }
        public MediaItem FeatureImage { get; set; }
        public bool HasFeatureImage => FeatureImage != null;
        public string HasFeatureImageClass => HasFeatureImage ? "has-image" : "";
        public bool HasTags => Tags.Any();
        public string NiceTime => Time.HasValue ? $"{Time.Value.ToString("d")}{DaySuffix()} {Time.Value.ToString("MMMM yyyy")}" : "";

        private string DaySuffix()
        {
            if(!Time.HasValue) return "";

            var day = Time.Value.Day;

            if (day == 1) return "st";
            if (day == 2) return "nd";
            if (day == 3) return "rd";

            return "th";
        }
    }
}