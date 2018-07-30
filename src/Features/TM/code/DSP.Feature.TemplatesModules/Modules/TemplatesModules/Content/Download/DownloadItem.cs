using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;
using Sitecore.Data;
using Sitecore.Data.Items;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Download
{
    public class DownloadItem
    {
        [ItemPropertyMap(ItemPropertyMappingType.ItemId)]
        public ID DownloadItemId { get; set; }

        public MediaItem DownloadMediaItem { get; set; }

        public string FilesSize { get; set; }

        public string Url { get; set; }
    }
}