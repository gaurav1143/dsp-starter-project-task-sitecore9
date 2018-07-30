using System.Text.RegularExpressions;
using Sitecore.Pipelines.RenderField;

namespace DSP.Foundation.Pipelines.RenderField
{
    /// <summary>
    /// Taken from http://www.mikkelhm.dk/post/2013/07/06/Removing-width-and-height-tags-from-FieldRenderer-and-scimage.aspx @ 13/2/2014
    /// Removes the rendering of the height and width attributes when rendering an image
    /// Just add "responsive=1" to the FieldRenderer parameters attribute
    /// </summary>
    public class GetImageFieldValueResponsive
    {
        public void Process(RenderFieldArgs args)
        {
            if (args.FieldTypeKey != "image")
                return;
            if (args.Parameters.ContainsKey("responsive"))
            {
                string imageTag = args.Result.FirstPart;
                imageTag = Regex.Replace(imageTag, @"(<img[^>]*?)\s+height\s*=\s*\S+", "$1", RegexOptions.IgnoreCase);
                imageTag = Regex.Replace(imageTag, @"(<img[^>]*?)\s+width\s*=\s*\S+", "$1", RegexOptions.IgnoreCase);
                imageTag = Regex.Replace(imageTag, @"(<img[^>]*?)\s+responsive\s*=\s*\S+", "$1", RegexOptions.IgnoreCase);
                args.Result.FirstPart = imageTag;
            }

        }
    }
}
