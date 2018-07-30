using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace DSP.Foundation.Forms
{
    public class FormValidationHelper
    {
        public static ModelStateErrors GetInvalidFormObject(ModelStateDictionary modelState, string errorTitle = null)
        {
            return new ModelStateErrors
            {
                Status = new[] {
                    new  ModelStateErrorSummary{
                        Type = "error",
                        Title = errorTitle ?? "There are some validation issues.",
                        Description = GetSummary(modelState),
                        Controls = modelState.Keys.Where(k => modelState[k].Errors.Count > 0)
                            .Select(e => new ModelStateErrorInfo
                            {
                                Message = modelState[e].Errors.First().ErrorMessage,
                                Id = e.Replace(".", HtmlHelper.IdAttributeDotReplacement)
                            })
                    }
                }
            };
        }

        // class level are assumed to be those with id=""
        /// <summary>
        /// Get class level validation errors to present in the validation summary
        /// </summary>
        /// <remarks>
        /// The Key of a class level validation result should be Empty.
        /// If you have named (in HTML) *any* of the postback fields e.g. name="formModel.MyProperty", the Key of a class 
        /// level will ValidationResult come back as "formModel".
        /// </remarks>
        /// <param name="modelState"></param>
        /// <returns></returns>
        private static string GetSummary(ModelStateDictionary modelState)
        {
            var errors = modelState.Keys
                .Where(key => modelState[key].Errors.Any())
                .Select(error => new ModelStateErrorInfo
                {
                    Message = modelState[error].Errors.First().ErrorMessage,
                    Id = error
                })
                .Where(arg => string.IsNullOrWhiteSpace(arg.Id));

            return errors.FirstOrDefault()?.Message;
        }
    }

    public class ModelStateErrors
    {
        public ModelStateErrors()
        {
            Status = Enumerable.Empty<ModelStateErrorSummary>();
        }

        public IEnumerable<ModelStateErrorSummary> Status { get; set; }

        public bool HasAnyErrors ()
        {
            return HasSummaryError() || HasPropertyErrors();
        }

        public string GetSummaryError()
        {
            return Status.First().Description;
        }

        public IEnumerable<ModelStateErrorInfo> GetPropertyErrors()
        {
            return Status.SelectMany(summary => summary.Controls).Where(info => !string.IsNullOrWhiteSpace(info.Id));
        }

        public bool HasSummaryError()
        {
            return !string.IsNullOrWhiteSpace(Status.First().Description);
        }

        public bool HasPropertyErrors()
        {
            return Status.SelectMany(summary => summary.Controls).Any(info => !string.IsNullOrWhiteSpace(info.Id));
        }
    }

    public class ModelStateErrorSummary
    {
        public ModelStateErrorSummary()
        {
            Controls = Enumerable.Empty<ModelStateErrorInfo>();
        }

        public string Type { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IEnumerable<ModelStateErrorInfo> Controls { get; set; }
    }

    public class ModelStateErrorInfo
    {
        public string Message { get; set; }
        public string Id { get; set; }
    }
}