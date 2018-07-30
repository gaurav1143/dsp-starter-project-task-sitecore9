namespace DSP.Foundation.Aspects
{
    public interface IPagedResultsAspect
    {
        int PageNumber { get; }
        int PageSize { get; }
        int PageTotal { get; }
        int ResultsTotal { get; }
    }
}
