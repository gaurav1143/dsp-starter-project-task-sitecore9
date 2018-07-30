using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Converters;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data;

namespace DSP.Business.Search.ContentSearch
{
    using DeloitteDigital.Atlas.Extensions;

    [DataContract]
    public class LuceneSearchResultItem : SearchResultItem
    {
        [DataMember, IndexField(DSP.Foundation.SitecoreTemplates.Title.Title_Field.FieldName_ToLowerInvariant)]
        public virtual string Title { get; set; }

        [DataMember, IndexField(DSP.Foundation.SitecoreTemplates.General_Text.GeneralText.FieldName_ToLowerInvariant)]
        public virtual string GeneralText { get; set; }

        [DataMember, IndexField("autocompletetitle")]
        public virtual string AutocompleteTitle { get; set; }

        [DataMember, IndexField("_boostedcontent")]
        public virtual string BoostedContent { get; set; }

        [DataMember, IndexField("contenttags")]
        [TypeConverter(typeof(IndexFieldEnumerableConverter))]
        public virtual IEnumerable<ID> ContentTags { get; set; }

        /// <summary>
        /// Content tags Facet includes the Content tags and all the parents of the tags in the Tag hierarchy
        /// </summary>
        [DataMember, IndexField("contenttagsfacet")]
        [TypeConverter(typeof(IndexFieldEnumerableConverter))]
        public virtual IEnumerable<ID> ContentTagsFacet { get; set; }

        [DataMember, IndexField("automatedtags")]
        public virtual IEnumerable<string> AutomatedTags { get; set; }

        [DataMember, IndexField("__created")]
        public virtual DateTime DateCreated { get; set; }

        [DataMember, IndexField("_latestversion")]
        public virtual bool IsLatestVersion { get; set; }

        [DataMember, IndexField("hidefromsitemap")]
        public virtual bool IsHiddenFromSitemap { get; set; }

        [DataMember, IndexField("hidefromsearch")]
        public virtual bool IsHiddenFromSearch { get; set; }

        [DataMember, IndexField("hasrendering")]
        public virtual bool HasRendering { get; set; }

        [DataMember, IndexField("ismediaitem")]
        public virtual bool IsMediaItem { get; set; }

        private string extension = string.Empty;

        [DataMember, IndexField("extension")]
        public virtual string Extension
        {
            get { return this.extension; }
            set
            {
                if (value.HasValue())
                    this.extension = value.ToLower();
            }
        }

        [DataMember, IndexField("pagesummary")]
        public virtual string PageSummary { get; set; }

        [DataMember, IndexField("isfeatured")]
        public virtual bool IsFeatured { get; set; }
    }
}
