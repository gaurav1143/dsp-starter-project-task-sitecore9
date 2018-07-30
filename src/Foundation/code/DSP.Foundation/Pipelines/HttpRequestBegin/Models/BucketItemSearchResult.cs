using System.Runtime.Serialization;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.SearchTypes;

namespace DSP.Foundation.Pipelines.HttpRequestBegin.Models
{
    [DataContract]
    public class BucketItemSearchResult : SearchResultItem
    {
        [DataMember]
        [IndexField("_latestversion")]
        public bool IsLatestVersion { get; set; }
    }
}
