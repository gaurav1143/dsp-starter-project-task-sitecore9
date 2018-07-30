using System;
using System.Reflection;
using System.Web.Mvc;

namespace DSP.Foundation.Forms
{
    public class FormActionFilterAttribute : ActionMethodSelectorAttribute
    {
        private readonly string _actionName;
        private readonly string _formFieldName;

        public FormActionFilterAttribute(string actionName, string formFieldName = null)
        {
            _actionName = actionName;
            _formFieldName = formFieldName;
        }

        public override bool IsValidForRequest(ControllerContext controllerContext, MethodInfo methodInfo)
        {
            var postedActionName = controllerContext.HttpContext.Request[_formFieldName ?? Constants.FormActionFilterName];

            if (string.IsNullOrWhiteSpace(postedActionName))
            {
                return false;
            }

            return postedActionName.Equals(_actionName, StringComparison.OrdinalIgnoreCase);
        }
    }
}