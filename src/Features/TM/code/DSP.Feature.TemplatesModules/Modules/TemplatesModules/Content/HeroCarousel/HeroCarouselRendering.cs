using System.Collections.Generic;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Mvc.Presentation;
using DataSource = DeloitteDigital.Atlas.DataSource;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroCarousel
{
    public class HeroCarouselRendering : RenderingModel<HeroCarousel>, IHideOnError
    {
        protected override HeroCarousel InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var item = (dataSource?.Item ?? CurrentItem);
            var vm = Map<HeroCarousel>(item);

            // map carousel items based on template
            var slides = new List<BaseHeroCarouselSlide>();
            foreach (var slide in ((MultilistField)item.Fields[SitecoreTemplates.Hero_Carousel_Item.CarouselItems.FieldName]).GetItems())
            {
                if (slide.TemplateID == ID.Parse(SitecoreTemplates.Hero_Carousel_Slide_Item.TemplateId))
                {
                    slides.Add(Map<HeroCarouselSlide>(slide));
                }
                else if (slide.TemplateID == ID.Parse(SitecoreTemplates.Hero_Carousel_Video_Item.TemplateId))
                {

                    slides.Add(Map<HeroCarouselVideoSlide>(slide));
                }
            }

            vm.CarouselItems = slides;
            return vm;
        }
    }
}