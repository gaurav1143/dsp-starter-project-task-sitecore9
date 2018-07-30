using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;

namespace DSP.Foundation.Mvc
{
    public static class CurrentRendering
    {
        /// <summary>
        /// Gets the current datasource mapped to the rendering item. If this is empty, fallback is current context item.
        /// </summary>
        public static Item DataSourceOrCurrentItem
        {
            get
            {
                var datasourceId = RenderingContext.Current.Rendering.DataSource;
                return ID.IsID(datasourceId)
                    ? DataSource
                    : RenderingContext.Current.ContextItem;
            }
        }

        /// <summary>
        /// Gets the current datasource mapped to the rendering item.
        /// </summary>
        public static Item DataSource
        {
            get
            {
                var datasourceId = RenderingContext.Current.Rendering.DataSource;
                return ID.IsID(datasourceId)
                    ? RenderingContext.Current.ContextItem.Database.GetItem(new ID(datasourceId))
                    : null;
            }
        }
    }
}