using DSP.Foundation.ContentTypes;

namespace DSP.Business.Search.ComputedFields.AutomatedTags.ValueProviders
{
    using System;
    using System.Linq;

    using Microsoft.Practices.ServiceLocation;

    using Sitecore.Data;
    using Sitecore.Data.Items;

    public class ContentTypeAutomatedTagValueProvider : IAutomatedTagValueProvider
    {
        private readonly ContentTypeRepository contentTypeRepository;

        public ContentTypeAutomatedTagValueProvider(ContentTypeRepository repository)
        {
            this.contentTypeRepository = repository;
        }

        public object GetValue(Item item)
        {
            var contentTypes = this.contentTypeRepository.Get();
            var contentType = contentTypes.FirstOrDefault(type => type.SitecoreTemplateId == item.TemplateID);

            if (contentType == null) return null;

            // use the mapped content type id, not the template id
            return string.Format("{0}_{1}",
                Constants.AutomatedTags.ContentType.ToShortID(),
                contentType.Id);
        }

        public bool IsValid(string rawValue)
        {
            Tuple<ID, string> tagValue;

            if (!rawValue.TryParseAutomatedTagValue(out tagValue)) return false;
            if (!tagValue.Item1.Equals(Constants.AutomatedTags.ContentType)) return false;

            var contentTypes = contentTypeRepository.Get();
            var contentType = contentTypes.FirstOrDefault(t => t.Id == tagValue.Item2);
            return (contentType != null);
        }

        public string GetDisplayValue(string rawValue)
        {
            if (!this.IsValid(rawValue)) return "";

            var typeID = rawValue.ParseAutomatedTagValue().Item2;

            var contentTypes = contentTypeRepository.Get();
            var contentType = contentTypes.FirstOrDefault(t => t.Id == typeID);

            if (contentType == null) return "";

            return contentType.Title;            
        }
    }
}
