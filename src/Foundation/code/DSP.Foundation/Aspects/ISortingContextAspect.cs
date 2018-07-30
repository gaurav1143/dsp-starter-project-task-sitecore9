using System.Collections.Generic;

namespace DSP.Foundation.Aspects
{
    public interface ISortingContextAspect : IQueryStringContextAspect
    {
        ISearchAspect<ISortOrderOption> SortBy { get; } 
        IEnumerable<ISortOrderOption> SortOrderOptions { get; }
    }

    public interface ISortOrderOption
    {
        string Key { get; }
        string Label { get; }
        string Type { get; }
    }
}
