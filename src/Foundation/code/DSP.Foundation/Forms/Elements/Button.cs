using System;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class Button : HtmlTag
    {
        public Button(string text, string @type, bool hideCtaClass = false, bool hideBtnHolder = false)
            : this("button")
        {
            Attr("type", @type);
            Attr("role", "button");

            if (!hideCtaClass) AddClass("cta");

            Text(text);

            if (!hideBtnHolder)
            {
                var buttonHolder = new HtmlTag("div", tag => tag.AddClass("btn-holder"));
                WrapWith(buttonHolder);
            }

            RenderFromTop();
        }

        protected Button(string tag) : base(tag)
        {
        }

        protected Button(string tag, Action<HtmlTag> configure) : base(tag, configure)
        {
        }

        protected Button(string tag, HtmlTag parent) : base(tag, parent)
        {
        }
    }
}