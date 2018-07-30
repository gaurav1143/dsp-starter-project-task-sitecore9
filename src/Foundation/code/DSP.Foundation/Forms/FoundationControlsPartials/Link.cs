using HtmlTags;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        /// <summary>
        /// Render a link.
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="url"></param>
        /// <param name="text"></param>
        /// <param name="target"></param>
        /// <param name="disable"></param>
        /// <returns></returns>
        public HtmlTag Link(string url, string text, string target, bool disable = false)
        {
            var isDisabled = disable || IsSitecore();
            if (isDisabled)
                url = "#";

           return new HtmlTag("a", 
               tag =>
               {
                   tag.Attr("href", url).Text(text);

                   if (isDisabled) tag.AddClass("is-disabled");

                   if (!string.IsNullOrEmpty(target)) AddTarget(tag, target);
               });
        }

        private static void AddTarget(HtmlTag tag, string target)
        {
            tag.Attr("target", target);
        } 
    }
}