using System.Collections.Specialized;

namespace DSP.Foundation.Aspects
{
    public interface IQueryStringContextAspect
    {
        NameValueCollection AsNameValueCollection();
    }
}
