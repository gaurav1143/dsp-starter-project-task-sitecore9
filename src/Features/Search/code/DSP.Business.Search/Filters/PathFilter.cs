using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace DSP.Business.Search.Filters
{
    public class PathFilter<T> : ISearchFilter<T> where T : SearchResultItem
    {
        private readonly ID _itemId;

        public PathFilter(ID itemId)
        {
            _itemId = itemId;
        }

        public Expression<Func<T, bool>> Filter()
        {
            return item => item.Paths.Contains(_itemId);
        }
    }
}
