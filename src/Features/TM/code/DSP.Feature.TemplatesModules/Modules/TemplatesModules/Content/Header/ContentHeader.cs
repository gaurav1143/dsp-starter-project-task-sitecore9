using System.Collections.Generic;
using System.Linq;
using DSP.Feature.Search.Modules.Search.Tags;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Header
{
    public class ContentHeader
    {
        [FieldMap]
        public IFieldRenderingString Title { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.Has_Tags.ContentTags.FieldName, FieldType.Multi)]
        public IEnumerable<Tag> ContentTags { get; set; }

        public string SearchResultsUrl { get; set; }

        public ContentHeader()
        {
            ContentTags = Enumerable.Empty<Tag>();
        }
    }
}