using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;
using Sitecore.Data.Items;

namespace DSP.Foundation.Configuration
{
    public class SiteConfiguration
    {
        public Item ConfigItem { get; set; }

        [FieldMap(SitecoreTemplates.Header.LogoImage.FieldName)]
        public IMediaRenderingString LogoImage { get; set; }

        [FieldMap(SitecoreTemplates.Header.GlobalPageTitle.FieldName)]
        public IFieldRenderingString GlobalPageTitle { get; set; }

        [FieldMap(SitecoreTemplates.Social_Media.SocialMediaTwitterAccount.FieldName)]
        public string SocialMediaTwitterAccount { get; set; }

        [FieldMap(SitecoreTemplates.Header.SearchResultsPage.FieldName)]
        public ILinkFieldRenderingString SearchResultsPage { get; set; }

        [FieldMap]
        public string MapAPIKey { get; set; }

        [FieldMap]
        public string FacebookAppID { get; set; }
    }
}
