using HtmlTags;

namespace DSP.Foundation.Forms.Includes
{
    public class ErrorMessage
    {
        private readonly HtmlTag _inner = new HtmlTag("div");

        public ErrorMessage(string value)
        {
            _inner.AddClass("status-msg");
            _inner.Append(new HtmlTag("span", tag => tag.AddClass("error")).Text(value));
        }

        public override string ToString()
        {
            return _inner.ToString();
        }
    }
}