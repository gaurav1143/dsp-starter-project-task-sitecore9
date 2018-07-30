using Sitecore.Data;

namespace DSP.Foundation.ContentTypes
{
    public class ContentType
    {
        public ContentType(string id, string title, ID sitecoreTempalteId)
        {            
            Id = id;
            Title = title;
            SitecoreTemplateId = sitecoreTempalteId;
        }

        public string Id { get; private set; }

        public string Title { get; private set; }

        public ID SitecoreTemplateId { get; private set; }
    }
}
