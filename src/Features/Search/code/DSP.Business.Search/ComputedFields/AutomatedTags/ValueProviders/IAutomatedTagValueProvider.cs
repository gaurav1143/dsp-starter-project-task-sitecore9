namespace DSP.Business.Search.ComputedFields.AutomatedTags.ValueProviders
{
    using Sitecore.Data.Items;

    public interface IAutomatedTagValueProvider
    {
        object GetValue(Item item);
        bool IsValid(string rawValue);
        string GetDisplayValue(string rawValue);
    }
}
