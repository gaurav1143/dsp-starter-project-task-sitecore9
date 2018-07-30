namespace DSP.Business.Search
{
    using Sitecore.Data;

    public static class Constants
    {

        public static class SearchContext
        {
            public static readonly int[] ValidPageSizes = { 10, 20, 30, 50, 100, 200 };
            public const string Delimiter = "~";

            public static class Keys
            {
                public const string Query = "q";
                public const string Facets = "f";
                public const string PageSize = "ps";
                public const string PageNumber = "pn";
                public const string Sort = "s";
                public const string FacetOperator = "fo";
                public const string ExcludedFacets = "xf";
                public const string ExcludedItems = "xi";
                public const string Templates = "t";
                public const string Path = "p";
                public const string Featured = "ff";
                public const string Order = "o";
            }
        }

        public static class AutomatedTags
        {
            public const string Key = "AutomatedTags";
            public const string ContentTypeString = "{0282794A-EF1D-4156-B4AD-429BE89ED411}";
            public const string YearPublishedString = "{EA0C670A-8CBB-4CE2-A8A4-7985C4807189}";
            public static ID ContentType = new ID(ContentTypeString);
            public static ID YearPublished = new ID(YearPublishedString);
        }

    }
}
