using DeloitteDigital.Atlas.Mapping.RenderingParameterMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Containers.DynamicContainer
{
    public class DynamicContainer
    {
        [RenderingParameterMap(Foundation.SitecoreTemplates.Has_Border_Option.BorderOption.FieldName)]
        public string BorderOption { get; set; }
    }
}