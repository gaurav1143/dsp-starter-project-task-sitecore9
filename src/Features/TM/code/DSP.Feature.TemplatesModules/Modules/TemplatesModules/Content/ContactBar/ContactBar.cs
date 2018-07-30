using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.RenderingParameterMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.ContactBar
{
    public class ContactBar
    {
        [FieldMap(Foundation.SitecoreTemplates.General_Image_Required.GeneralImage.FieldName)]
        public IMediaRenderingString GeneralImage { get; set; }
        [FieldMap(Foundation.SitecoreTemplates.Title_Required.Title.FieldName)]
        public IFieldRenderingString Title { get; set; }
        [FieldMap(SitecoreTemplates.Contact_Bar_Item.EmailLink.FieldName)]
        public ILinkFieldRenderingString EmailLink { get; set; }
        [FieldMap(SitecoreTemplates.Contact_Bar_Item.LocationLink.FieldName)]
        public ILinkFieldRenderingString LocationLink { get; set; }
        [FieldMap(SitecoreTemplates.Contact_Bar_Item.PhoneLink.FieldName)]
        public ILinkFieldRenderingString PhoneLink { get; set; }
        [RenderingParameterMap(Foundation.SitecoreTemplates.Has_Text_Background_Option.TextBackgroundOption.FieldName)]
        public string TextBackgroundOption { get; set; }
        [FieldMap(SitecoreTemplates.Contact_Bar_Item.EmailIcon.FieldName)]
        public IMediaRenderingString EmailIcon { get; set; }
        [FieldMap(SitecoreTemplates.Contact_Bar_Item.LocationIcon.FieldName)]
        public IMediaRenderingString LocationIcon { get; set; }
        [FieldMap(SitecoreTemplates.Contact_Bar_Item.PhoneIcon.FieldName)]
        public IMediaRenderingString PhoneIcon { get; set; }
    }
}