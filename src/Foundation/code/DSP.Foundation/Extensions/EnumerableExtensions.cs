using System;
using System.Collections.Generic;

namespace DSP.Foundation.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> FlattenRecursive<T>(this IEnumerable<T> enumerable,
            Func<T, IEnumerable<T>> enumerableSelector)
        {
            if (enumerable == null) yield break;
            if (enumerableSelector == null) throw new NullReferenceException("enumerableSelector");

            foreach (var element in enumerable)
            {
                yield return element;

                var candidate = enumerableSelector(element);

                if (candidate == null) continue;

                var children = FlattenRecursive(candidate, enumerableSelector);

                foreach (var child in children)
                {
                    yield return child;
                }
            }
        }
    }
}
