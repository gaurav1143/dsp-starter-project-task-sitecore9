using DeloitteDigital.Atlas.FieldRendering;

namespace DSP.Foundation.Extensions
{
    public static class MediaRenderingStringExtensions
    {
        public static IMediaRenderingString AsResponsiveImage(this IMediaRenderingString mediaRenderingString)
        {
            return mediaRenderingString?.WithAttribute("responsive", true) as IMediaRenderingString;
        }
    }
}
