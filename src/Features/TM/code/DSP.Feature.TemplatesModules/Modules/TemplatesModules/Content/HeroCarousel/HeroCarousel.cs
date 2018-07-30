using System.Collections.Generic;
using System.Linq;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroCarousel
{
    public class HeroCarousel
    {
        public HeroCarousel()
        {
            CarouselItems = Enumerable.Empty<BaseHeroCarouselSlide>();
        }
        
        public IEnumerable<BaseHeroCarouselSlide> CarouselItems { get; set; }
    }
}