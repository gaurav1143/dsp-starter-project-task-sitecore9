using System;
using System.Linq;
using System.Linq.Expressions;
using DSP.Business.Search.ContentSearch;
using Sitecore.Data;

namespace DSP.Business.Search.Filters
{
    public class ExcludeContentTagFilter<T> : ISearchFilter<T>
         where T : LuceneSearchResultItem
    {
        private readonly string _tag;

        public ExcludeContentTagFilter(string tag)
        {
            _tag = tag;
        }

        public Expression<Func<T, bool>> Filter()
        {
            var id = new ID(_tag);
            return item => !item.ContentTagsFacet.Contains(id);
        }
    }
}
