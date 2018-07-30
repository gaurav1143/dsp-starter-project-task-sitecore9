using Sitecore.Data.Items;
using Sitecore.Resources.Media;

namespace DSP.Foundation.Extensions
{
    public static class MediaItemExtensions
    {
        /// <summary>
        /// Gets the media URL.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="width">The width.</param>
        /// <param name="height">The height.</param>
        /// <param name="maxWidth">Width of the max.</param>
        /// <param name="maxHeight">Height of the max.</param>
        /// <param name="includeServerUrl">The include server URL.</param>
        /// <returns></returns>
        public static string GetMediaUrl(this MediaItem item, int width = 0, int height = 0, int maxWidth = 0, int maxHeight = 0, bool? includeServerUrl = null)
        {
            if (item == null) return string.Empty;

            // specify options and properties if any
            var options = new MediaUrlOptions();

            if (includeServerUrl.HasValue) options.AlwaysIncludeServerUrl = includeServerUrl.Value;
            if (width != 0) options.Width = width; // set width if specified
            if (height != 0) options.Height = height; // set height if specified
            if (maxWidth != 0) options.MaxWidth = maxWidth; // set MaxWidth if specified
            if (maxHeight != 0) options.MaxHeight = maxHeight; // set MaxHeight if specified

            // return media url
            return MediaManager.GetMediaUrl(item, options).ProtectAssetUrl();
        }

        public static string ProtectAssetUrl(this string url)
        {
            return HashingUtils.ProtectAssetUrl(url);
        }

    }
}
