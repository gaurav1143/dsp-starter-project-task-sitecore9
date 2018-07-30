namespace DSP.Business.Search.Filters
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;

    using Sitecore.ContentSearch.SearchTypes;
    using Sitecore.Data;
    using Sitecore.Diagnostics;
    using Sitecore.Sites;

    public class SiteFilter<T> : ISearchFilter<T> where T : SearchResultItem
    {
        private readonly ID _siteId;
        private readonly ID _mediaLibraryRootFolderId;

        /// <summary>
        /// Filter to the specified site. Based on the convention that the site content lives under 
        /// /sitecore/content/{sitename}
        /// and the media content lives under 
        /// /sitecore/Media Library/{sitename}
        /// </summary>
        /// <param name="siteContext">current site context</param>
        public SiteFilter(SiteContext siteContext)
        {
            Assert.ArgumentNotNull(siteContext, "siteContext");

            var sitename = siteContext.ContentStartPath.Split('/').LastOrDefault();

            _siteId = Sitecore.Context.Database.GetItem(string.Format("/sitecore/content/{0}", sitename)).ID;
            
            // default media library to site start in case it is not found supplied
            _mediaLibraryRootFolderId = _siteId;

            var mediaItemRoot = Sitecore.Context.Database.GetItem(string.Format("/sitecore/Media Library/{0}", sitename));

            if (mediaItemRoot != null)
            {
                _mediaLibraryRootFolderId = mediaItemRoot.ID;
            }
        }
        
        public Expression<Func<T, bool>> Filter()
        {
            return result => result.Paths.Contains(_siteId) || result.Paths.Contains(_mediaLibraryRootFolderId);
        }
    }
}