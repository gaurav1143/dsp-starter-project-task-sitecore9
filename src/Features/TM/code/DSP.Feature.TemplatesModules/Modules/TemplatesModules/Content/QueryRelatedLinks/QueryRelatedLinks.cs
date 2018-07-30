using System.Collections.Generic;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.QueryRelatedLinks
{
    public class QueryRelatedLinks
    {
        [FieldMap]
        public IFieldRenderingString Title { get; set; }
        public IEnumerable<QueryRelatedLinkItem> Links { get; set; }
        [FieldMap(SitecoreTemplates.Query_Related_Links.QueryRelatedLinksViewMoreLink.FieldName)]
        public ILinkFieldRenderingString ViewMoreLink { get; set; }
    }
}