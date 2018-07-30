using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data;
using Sitecore.Data.Items;
using System;
using System.Linq.Expressions;

namespace DSP.Business.Search.Filters
{
    public class ExcludeItemFilter<T> : ISearchFilter<T> where T : SearchResultItem
    {
        private readonly ID _itemId;

        public ExcludeItemFilter(Item item)
            : this(item.ID)
        {
        }

        public ExcludeItemFilter(ID itemId)
        {
            _itemId = itemId;
        }

        public Expression<Func<T, bool>> Filter()
        {
            return item => item.ItemId != _itemId;
        }
    }
}
