namespace DSP.Foundation.Aspects
{
    public interface IPagingContextAspect : IQueryStringContextAspect
    {
        ISearchAspect<int> PageNumber { get; }
        ISearchAspect<int> PageSize { get; }
        int[] ValidPageSizes { get; }
    }
}
