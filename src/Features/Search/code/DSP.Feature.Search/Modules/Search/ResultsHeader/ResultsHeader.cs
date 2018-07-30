namespace DSP.Feature.Search.Modules.Search.ResultsHeader
{
    using System.Collections.Generic;
    using System.Collections.Specialized;

    using DeloitteDigital.Atlas.Mapping.FieldMapping;

    public class ResultsHeader
    {
        [FieldMap(Foundation.SitecoreTemplates.Has_Items_Per_Page.ShowItemsPerPage.FieldName)]
        public bool ShowItemsPerPage { get; set; }

        public IEnumerable<SelectOption> ItemsPerPage { get; set; }

        public IEnumerable<SelectOption> SortOrderOptions { get; set; }

        public int ResultsTotal { get; set; }

        public int ResultPageFrom { get; set; }

        public int ResultPageTo { get; set; }

        public string FormBaseUrl { get; set; }

        public NameValueCollection HiddenFields { get; set; }
    }
}