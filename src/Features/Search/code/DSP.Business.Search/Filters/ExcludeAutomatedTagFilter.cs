using System;
using System.Linq;
using System.Linq.Expressions;
using DSP.Business.Search.ContentSearch;

namespace DSP.Business.Search.Filters
{
    public class ExcludeAutomatedTagFilter<T> : ISearchFilter<T>
        where T : LuceneSearchResultItem
    {
        private readonly string _tag;

        public ExcludeAutomatedTagFilter(string tag)
        {
            _tag = tag;
        }

        public Expression<Func<T, bool>> Filter()
        {
            return item => !item.AutomatedTags.Contains(_tag);
        }
    }
}