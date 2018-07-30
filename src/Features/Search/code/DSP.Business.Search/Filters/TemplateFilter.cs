using System;
using System.Linq.Expressions;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data;

namespace DSP.Business.Search.Filters
{
    public class TemplateFilter<T> : ISearchFilter<T> 
        where T : SearchResultItem
    {
        private readonly ID _template;

        public TemplateFilter(ID template)
        {
            _template = template;
        }

        public Expression<Func<T, bool>> Filter()
        {
            return item => item.TemplateId == _template;
        }
    }
}
