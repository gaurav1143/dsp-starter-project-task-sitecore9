namespace DSP.Business.Search.Filters
{
    using System;
    using System.Linq.Expressions;

    using Sitecore.ContentSearch.SearchTypes;

    public class LanguageFilter<T> : ISearchFilter<T> where T : SearchResultItem
    {
        private readonly string _language;

        /// <summary>
        /// Filter on language
        /// </summary>
        /// <param name="language">a two character language code</param>
        public LanguageFilter(string language = "en")
        {
            _language = language;
        }

        public Expression<Func<T, bool>> Filter()
        {
            return result => result.Language == _language;
        }
    }
}