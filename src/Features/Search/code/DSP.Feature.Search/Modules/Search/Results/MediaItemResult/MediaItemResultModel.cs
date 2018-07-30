namespace DSP.Feature.Search.Modules.Search.Results.MediaItemResult
{
    using DefaultResult;

    public class MediaItemResultModel : DefaultResultModel
    {
        public string FileType { get; set; }
        public string Size { get; set; }
        public string IconClass { get; set; }
    }
}