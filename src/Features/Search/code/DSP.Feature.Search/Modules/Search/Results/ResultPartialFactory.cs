namespace DSP.Feature.Search.Modules.Search.Results
{
    using System.Linq;
    using System.Web.Mvc;

    using Business.Search.ContentSearch.SearchResults;
    using System.Web.Mvc.Html;

    using DefaultResult;
    using ContentItemResult;
    using MediaItemResult;
    using System.Web;

    public class ResultPartialFactory
    {

        public MvcHtmlString Partial(HtmlHelper htmlHelper, ISearchResult searchResult)
        {
            if (searchResult is ContentSearchResult)
                return htmlHelper.Partial("~/Modules/Search/Results/ContentItemResult/ContentItemResultView.cshtml", ToViewModel((ContentSearchResult)searchResult));

            if (searchResult is MediaItemSearchResult)
                return htmlHelper.Partial("~/Modules/Search/Results/MediaItemResult/MediaItemResultView.cshtml", ToViewModel((MediaItemSearchResult)searchResult));

            return htmlHelper.Partial("~/Modules/Search/Results/DefaultResult/DefaultResultView.cshtml", ToViewModel(searchResult));
        }

        private ContentItemResultModel ToViewModel(ContentSearchResult searchResult)
        {
            return new ContentItemResultModel
            {
                Url = searchResult.Url,
                Title = searchResult.Title,
                Summary = searchResult.Summary,
                Date = searchResult.Date,
                Tags = Tags.Tag.FromContentTags(searchResult.Tags.Where(t => !t.IsHiddenFromDisplay)),
                FeatureImage = searchResult.FeatureImage
            };
        }

        private MediaItemResultModel ToViewModel(MediaItemSearchResult searchResult)
        {
            return new MediaItemResultModel
            {
                Url = searchResult.Url,
                Title = searchResult.Title,
                Summary = searchResult.Summary,
                Date = searchResult.Date,
                FileType = searchResult.FileType?.ToUpperInvariant() ?? string.Empty,
                Size = MediaItemResultHelper.CalculateFileSizeForDisplay(searchResult.SizeInByte),
                IconClass = MediaItemResultHelper.GetIconClass(searchResult.FileType)
            };
        }

        private DefaultResultModel ToViewModel(ISearchResult searchResult)
        {
            return new ContentItemResultModel
            {
                Url = searchResult.Url,
                Title = searchResult.Title,
                Summary = searchResult.Summary,
                Date = searchResult.Date
            };
        }
    }
}