namespace DSP.Feature.Search.Modules.Search.Results.MediaItemResult
{
    using System;
    using System.Collections.Generic;
    public static class MediaItemResultHelper
    {
        public static string CalculateFileSizeForDisplay(string fieldValue)
        {
            var size = 0.0;
            if (!double.TryParse(fieldValue, out size)) return string.Empty;
            var sizeInMb = size / 1024 / 1024;
            return sizeInMb < 0.1 ? $"{Math.Floor(size / 1024)} KB" : $"{Math.Round(sizeInMb, 1)} MB";
        }

        private static readonly Dictionary<string, string> IconClasses = new Dictionary<string, string> {
            { "","svg-filetype-default-black" }, // default
            { "app","svg-filetype-app-black" },
            { "mp3","svg-filetype-audio-black" },
            { "wav","svg-filetype-audio-black" },
            { "doc","svg-filetype-doc-black" },
            { "docx","svg-filetype-doc-black" },
            { "rtf","svg-filetype-doc-black" },
            { "jpg","svg-filetype-image-black" },
            { "jpeg","svg-filetype-image-black" },
            { "gif","svg-filetype-image-black" },
            { "png","svg-filetype-image-black" },
            { "svg","svg-filetype-image-black" },
            { "pdf","svg-filetype-pdf-black" },
            { "ppt","svg-filetype-ppt-black" },
            { "pptx","svg-filetype-ppt-black" },
            { "mp4","svg-filetype-video-black" },
            { "wmv","svg-filetype-video-black" },
            { "vsd","svg-filetype-vsd-black" },
            { "xls","svg-filetype-xls-black" },
            { "xlsx","svg-filetype-xls-black" },
            { "zip","svg-filetype-zip-black" }
        };

        public static string GetIconClass(string fileExtension)
        {
            var extension = "";
            if (fileExtension != null) extension = fileExtension.ToLowerInvariant();
            return IconClasses[extension] ?? IconClasses[""];
        }
    }
}