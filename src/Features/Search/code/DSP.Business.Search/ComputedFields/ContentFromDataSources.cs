using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DSP.Business.Search.ComputedFields
{
    using IndexValueProviders;

    using Sitecore;
    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;
    using Sitecore.Data.Fields;
    using Sitecore.Data.Items;
    using Sitecore.Links;

    /// <summary>
    /// Crawls the renderings on an item and includes their content in the index. 
    /// Also indexes the children of the data source item (one level down only)
    /// </summary>
    /// <remarks>based on: 
    /// http://www.techphoria414.com/Blog/2013/November/Sitecore-7-Computed-Fields-All-Templates-and-Datasource-Content 
    /// http://kamsar.net/index.php/2014/05/indexing-subcontent/
    /// </remarks>
    public class ContentFromDataSources : IComputedIndexField
    {
        private static readonly HashSet<string> TextFieldTypes = new HashSet<string>(new[]
        {
            "Single-Line Text",
            "Rich Text",
            "Multi-Line Text",
            "text",
            "rich text",
            "html"
        });

        /// <summary>
        /// Add fields names that should not be added to the index. 
        /// </summary>
        private static readonly HashSet<string> IgnoreFields = new HashSet<string>();

        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            if (!ShouldIndexItem(item)) return null;

            var dataSources =
                Globals.LinkDatabase.GetReferences(item)
                       .Where(link => ShouldProcessLink(link, item))
                       .Select(link => link.GetTargetItem())
                       .Where(targetItem => targetItem != null)
                       .Distinct();

            var result = new StringBuilder();

            foreach (var dataSource in dataSources.Where(ShouldIndexDataSource))
            {
                IndexItemFields(dataSource, result);

                foreach (var childItem in dataSource.Children.ToArray())
                {
                    IndexItemFields(childItem, result);
                }
            }

            return result.ToString();
        }

        private static void IndexItemFields(Item dataSource, StringBuilder result)
        {
            dataSource.Fields.ReadAll();

            foreach (var field in dataSource.Fields.Where(ShouldIndexField))
            {
                result.AppendLine(field.Value);
            }
        }

        private static bool ShouldIndexItem(Item item)
        {
            // only items w/ layout that are not template standard values
            return item.Visualization != null && item.Visualization.Layout != null && !item.Paths.LongID.Contains(ItemIDs.TemplateRoot.ToString());
        }

        private static bool ShouldProcessLink(ItemLink link, Item sourceItem)
        {
            // layout field references in the same database
            return ((link.SourceFieldID == FieldIDs.LayoutField || link.SourceFieldID == FieldIDs.FinalLayoutField) 
                    && link.SourceDatabaseName == sourceItem.Database.Name);
        }

        private static bool ShouldIndexDataSource(Item item)
        {
            // don't process references to renderings
            return !item.Paths.LongID.Contains(ItemIDs.LayoutRoot.ToString());
        }

        private static bool ShouldIndexField(Field field)
        {
            // process non-empty text fields that are not part of the standard template
            return !field.Name.StartsWith("__")
                && !IsIgnoreField(field)
                && IsTextField(field)
                && !string.IsNullOrEmpty(field.Value);
        }

        private static bool IsTextField(Field field)
        {
            return TextFieldTypes.Contains(field.Type);
        }

        private static bool IsIgnoreField(Field field)
        {
            return IgnoreFields.Contains(field.Name);
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
