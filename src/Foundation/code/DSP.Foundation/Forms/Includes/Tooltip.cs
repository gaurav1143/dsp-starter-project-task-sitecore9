using System.Web;
using HtmlTags;

namespace DSP.Foundation.Forms.Includes
{
    public class Tooltip
    {
        private readonly HtmlTag _inner = new HtmlTag("button");

        public Tooltip(string value) : this()
        {
            _inner.Title(value);
        }

        public Tooltip(IHtmlString value) : this()
        {
            _inner.Data("tooltip-html", value);
        }

        private Tooltip()
        {
            _inner.Attr("type", "button");
            _inner.AddClass("js-tooltip tooltip-btn");
            _inner.AppendHtml("Tooltip");
        }

        public override string ToString()
        {
            return _inner.ToString();
        }
    }
}