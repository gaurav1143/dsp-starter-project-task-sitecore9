using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.Tags
{
    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.Data;

    public class ContentTagFactory
    {
        private readonly IEnumerable<ContentTag> _contentTags;

        public ContentTagFactory(TagRepository tagRepository)
        {
            // PERFORMANCE: cache tags for this instance.            
            _contentTags = tagRepository.Get();
        }

        public bool IsValid(string rawValue)
        {
            return Create(rawValue) != null;
        }

        public ContentTag Create(string value)
        {
            ID id;
            if (!value.TryParseShortID(out id)) return null;

            return _contentTags.FirstOrDefault(tag => tag.Id == id);
        }
    }
}
