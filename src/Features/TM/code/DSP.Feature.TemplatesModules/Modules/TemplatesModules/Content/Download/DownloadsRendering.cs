using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Download
{
    public class DownloadsRendering : RenderingModel<Download>, IHideOnError
    {
        protected override Download InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var downloadItemSet =  Map<Download>(dataSource.Item);
            foreach (var downloadItem in downloadItemSet.Downloads)
            {
                var item = Sitecore.Context.Database.GetItem(downloadItem.DownloadItemId);
                if (item == null || !item.Paths.IsMediaItem) continue;
                downloadItem.DownloadMediaItem = new MediaItem(item);
                var mb = (double) downloadItem.DownloadMediaItem.Size/1024/1024;
                downloadItem.FilesSize = mb.ToString("F1");
                downloadItem.Url = MediaManager.GetMediaUrl(downloadItem.DownloadMediaItem);
            }
            return downloadItemSet;
        }
    }
}