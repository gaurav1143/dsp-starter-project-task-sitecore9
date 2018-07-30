using HtmlTags;

namespace DSP.Foundation.Forms.Includes
{
    public class HelpText 
    {
        private readonly HtmlTag _inner = new HtmlTag("em");

        public HelpText(string value)
        {
            _inner.AddClass("help");
            _inner.AppendHtml(value);
        }

        public override string ToString()
        {
            return _inner.ToString();
        }
    }
}