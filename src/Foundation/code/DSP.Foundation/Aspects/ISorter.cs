using System.Linq;

namespace DSP.Foundation.Aspects
{
    public interface ISorter<T>
    {
        IOrderedQueryable<T> Sort(IQueryable<T> queryable);
    }
}
