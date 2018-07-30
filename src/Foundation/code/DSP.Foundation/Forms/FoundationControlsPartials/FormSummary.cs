using HtmlTags;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        /// <summary>
        /// Renders the model state errors in a form summary. Can be used outside of a form.
        /// </summary>
        /// <param name="title">Form summary title (the red bar)</param>
        /// <returns></returns>
        public HtmlTag FormSummary(string title = "An unexpected error occurred")
        {
            var modelState = GetModelStateErrrors(title);

            if(!modelState.HasAnyErrors()) return HtmlTag.Empty();

            var formSummary = new HtmlTag("div", tag => tag.AddClass("form-summary"));

            formSummary.AddClass("is-error");

            if (!string.IsNullOrWhiteSpace(title))
            {
                formSummary.Append(
                        new HtmlTag("div", tag => tag.AddClass("form-summary-title"))
                            .Append(new HtmlTag("h2", tag => tag.Text(title))));
            }

            if (modelState.HasSummaryError())
            {
                formSummary.Append(
                       new HtmlTag("p", tag => tag.Text(modelState.GetSummaryError())));
            }

            if (modelState.HasPropertyErrors())
            {
                var errors = new HtmlTag("ul");

                foreach (var error in modelState.GetPropertyErrors())
                {
                    errors.Append(new HtmlTag("li").Text(error.Message));
                }

                formSummary.Append(errors);
            }

            return formSummary;
        }

        private ModelStateErrors GetModelStateErrrors(string title)
        {
            return FormValidationHelper.GetInvalidFormObject(_modelState, title);
        }
    }
}