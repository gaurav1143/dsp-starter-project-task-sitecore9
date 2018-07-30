namespace DSP.Feature.Search.Modules.Search.Results.NoResults
{
    public class NoResults
    {
        public NoResults(bool filtersApplied, string noFiltersLink, string contextItemId)
        {
            FiltersApplied = filtersApplied;
            NoFiltersLink = noFiltersLink;
            ContextItemId = contextItemId;
        }

        public bool FiltersApplied { get; private set; }
        public string NoFiltersLink { get; private set; }
        public string ContextItemId { get; set; }
    }
}