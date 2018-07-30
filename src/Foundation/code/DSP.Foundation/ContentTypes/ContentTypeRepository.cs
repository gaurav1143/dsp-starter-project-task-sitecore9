using System.Collections.Generic;
using Sitecore.Data;

namespace DSP.Foundation.ContentTypes
{
    /// <summary>
    /// This is a *simple* implementation of a content type repository, simply mapping some templates to content types. 
    /// This should probably be content managable - note: if this is sourced from the CMS, it needs to be cached! 
    /// </summary>
    public class ContentTypeRepository
    {
        private readonly IEnumerable<ContentType> contentTypes = new List<ContentType>
                                                           {
                                                               new ContentType("article", "Article", new ID("{46BAE768-310D-4314-AEF2-AE247E5C4850}")),
                                                               new ContentType("pdf", "PDF", new ID("{0603F166-35B8-469F-8123-E8D87BEDC171}"))
                                                           };

        public IEnumerable<ContentType> Get()
        {
            return contentTypes;
        } 
    }
}
