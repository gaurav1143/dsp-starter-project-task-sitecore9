namespace DSP.Business.Search.Facets
{
    public class Facet<T> where T : IFacetable
    {
        public Facet(int count, T item)
        {
            Count = count;
            Item = item;
        }

        public int Count { get; private set; }
        public T Item { get; private set; }
    }
}
