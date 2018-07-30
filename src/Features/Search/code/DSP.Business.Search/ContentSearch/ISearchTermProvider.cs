namespace DSP.Business.Search.ContentSearch
{
    using System.Collections.Generic;

    public interface ISearchTermProvider
    {
        IEnumerable<string> GetTermsFromQuery(string query);
    }
}