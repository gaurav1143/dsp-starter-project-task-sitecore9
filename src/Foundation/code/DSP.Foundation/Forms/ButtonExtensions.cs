using System;
using DSP.Foundation.Forms.Elements;

namespace DSP.Foundation.Forms
{
    public static class ButtonExtensions
    {
        public static Button DisableIf(this Button button, Func<bool> disable)
        {
            var isDisabled = disable?.Invoke() ?? false;

            if (isDisabled) button.Attr("disabled", "disabled");

            return button;
        }

        public static Button DisableIf(this Button button, bool disable)
        {
            if (disable) button.Attr("disabled", "disabled");

            return button;
        }
    }
}