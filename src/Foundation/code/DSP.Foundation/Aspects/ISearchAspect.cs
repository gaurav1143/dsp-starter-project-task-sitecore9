namespace DSP.Foundation.Aspects
{
    public interface ISearchAspect<out T>
    {
        string Key { get; }
        T Value { get; }
        string ToString();
        void Set(string value);
    }
}
