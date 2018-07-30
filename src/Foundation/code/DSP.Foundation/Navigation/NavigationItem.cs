using System.Collections.Generic;
using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;

namespace DSP.Foundation.Navigation
{
    public class NavigationItem
    {
        public NavigationItem()
        {
            this.Children = new List<NavigationItem>();
        }

        [ItemPropertyMap(ItemPropertyMappingType.ItemId)]
        public string ItemId { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.ItemPath)]
        public string ItemPath { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.ItemUrl)]
        public string ItemUrl { get; set; }

        [FieldMap]
        public string NavigationTitle { get; set; }

        [FieldMap]
        public string Description { get; set; }

        /// <summary>
        // Note: we cannot use ChildrenMap from the framework to build up the navigation since it is recursive 
        // and would map the entire content tree (including parts that are hidden from navigation or in buckets)
        /// </summary>
        public IEnumerable<NavigationItem> Children { get; set; }
    }
}
