using System;
using System.Linq.Expressions;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data;
using Sitecore.Data.Items;

namespace DSP.Business.Search.Filters
{
    public class ItemFilter<T> : ISearchFilter<T> where T : SearchResultItem
    {
        private readonly ID _itemId;

        public ItemFilter(Item item)
            : this(item.ID)
        {
        }

        public ItemFilter(ID itemId)
        {
            _itemId = itemId;
        }

        public Expression<Func<T, bool>> Filter()
        {
            return item => item.ItemId == _itemId;
        }
    }
}