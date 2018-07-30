namespace DSP.Business.Search.Filters
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Linq.Expressions;

    using DSP.Business.Search.ContentSearch;

    public class SearchableMediaItemFilter<T> : ISearchFilter<T>
        where T : LuceneSearchResultItem
    {
        private const string AllowedExtensionsKey = "DSP.Business.Search.Filters.SearchableMediaItemFilter.AllowedExtensions";

        private readonly IEnumerable<string> allowedExtensions;

        public SearchableMediaItemFilter()
            : this(Sitecore.Configuration.Settings.GetSetting(AllowedExtensionsKey).ToLower().Split('|'))
        {
        }

        public SearchableMediaItemFilter(IEnumerable<string> allowedMediaTypes)
        {
            this.allowedExtensions = allowedMediaTypes;
        }

        public Expression<Func<T, bool>> Filter()
        {
            return result =>
                   // if it is a media item
                   result.IsMediaItem
                   // and have an extension in the allowed set
                   && this.allowedExtensions.Contains(result.Extension);
        }        
    }
}