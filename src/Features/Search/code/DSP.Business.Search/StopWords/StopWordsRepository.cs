using DeloitteDigital.Atlas.Caching;

namespace DSP.Business.Search.StopWords
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;    

    public class StopWordsRepository
    {
        private readonly ICacheService cache;

        public StopWordsRepository(ICacheService cache)
        {
            this.cache = cache;
        }

        public IEnumerable<string> Get()
        {
            return cache.CreateOrGet("DOH.Business.Search.StopWords.StopWordsRepository", TimeSpan.FromDays(1), GetImpl);            
        }

        private static IEnumerable<string> GetImpl()
        {
            var path = HttpContext.Current.Server.MapPath("~/app_data/stopwords.txt");

            return !File.Exists(path)
                ? Enumerable.Empty<string>()
                : File.ReadAllLines(path);
        }
    }
}
