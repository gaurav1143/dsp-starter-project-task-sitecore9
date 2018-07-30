using System;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class ControlHolder : HtmlTag
    {
        public ControlHolder()
            : this("div")
        {
            AddClass("ctrl-holder");
        }

        protected ControlHolder(string tag) : base(tag) { }
        protected ControlHolder(string tag, Action<HtmlTag> configure) : base(tag, configure) { }
        protected ControlHolder(string tag, HtmlTag parent) : base(tag, parent) { }
    }
}