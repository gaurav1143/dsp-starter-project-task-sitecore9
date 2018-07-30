using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Video
{
    public class Video
    {
        [FieldMap(SitecoreTemplates.Video.YoutubeId.FieldName)]
        public string YoutubeId { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.Title_Required.Title.FieldName)]
        public IFieldRenderingString Title { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.General_Text.GeneralText.FieldName)]
        public IFieldRenderingString GeneralText { get; set; }

        [FieldMap(SitecoreTemplates.Video.VideoTranscriptTitle.FieldName)]
        public IFieldRenderingString VideoTranscriptTitle { get; set; }

        [FieldMap(SitecoreTemplates.Video.VideoTranscript.FieldName)]
        public IFieldRenderingString VideoTranscript { get; set; }
    }
}