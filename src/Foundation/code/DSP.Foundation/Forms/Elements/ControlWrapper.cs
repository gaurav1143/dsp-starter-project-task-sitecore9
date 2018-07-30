using System;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class ControlWrapper : HtmlTag
    {
        public ControlWrapper()
            :this("div", tag => tag.AddClass("ctrl"))
        {
        }

        protected ControlWrapper(string tag) : base(tag) { }
        protected ControlWrapper(string tag, Action<HtmlTag> configure) : base(tag, configure) { }
        protected ControlWrapper(string tag, HtmlTag parent) : base(tag, parent) { }
    }
}