using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public class StatusMessage : DivTag
    {
        public StatusMessage()
            :this("")
        {
        }

        public StatusMessage(string id) : base(id)
        {
            AddClass("status-msg");
        }
    }
}