using System;
using DSP.Foundation.Forms;

namespace DSP.Foundation.Forms
{

    [AttributeUsage(AttributeTargets.Property)]
    public class LabelOptionAttribute : Attribute
    {
        public LabelOption LabelOption { get; set; }

        public LabelOptionAttribute(LabelOption labelOption)
        {
            LabelOption = labelOption;
        }
    }
}