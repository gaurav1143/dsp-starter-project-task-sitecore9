using System.ComponentModel;

namespace DSP.Business.Search.SearchContext
{
    public enum FeaturedOption
    {
        Both = 0,
        [Description("Include featured search results only")] Yes,
        [Description("Exclude featured search results")] No
    }
}