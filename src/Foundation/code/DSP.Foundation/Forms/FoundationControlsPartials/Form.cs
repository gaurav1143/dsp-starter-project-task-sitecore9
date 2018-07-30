using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using DSP.Foundation.Extensions;
using Sitecore.Mvc.Configuration;

// ReSharper disable once CheckNamespace
namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        /// <summary>
        /// Begin a form element
        /// </summary>
        /// <param name="routeName">default is the current sitecore route name</param>
        /// <param name="formMethod">default is POST</param>
        /// <param name="formId"></param>
        /// <param name="errorTitle"></param>
        /// <param name="attributes"></param>
        /// <returns></returns>
        public MvcForm BeginRouteForm(string routeName = null, FormMethod formMethod = FormMethod.Post,
            string formId = null, string errorTitle = null, object attributes = null)
        {
            return BeginRouteForm(
                routeName ?? MvcSettings.SitecoreRouteName, 
                formMethod, 
                formId, 
                errorTitle, 
                HtmlHelper.AnonymousObjectToHtmlAttributes(attributes));
        }

        public MvcForm BeginRouteForm(string routeName, FormMethod formMethod = FormMethod.Post,
           string formId = null, string errorTitle = null, IDictionary<string, object> htmlAttributes = null)
        {
            htmlAttributes = htmlAttributes ?? new Dictionary<string, object>();
            htmlAttributes.Add("novalidate", "novalidate");
            htmlAttributes.Merge("class", "js-validate js-validate-sync");
            
            if (!string.IsNullOrWhiteSpace(formId)) htmlAttributes.Add("data-form-id", formId);

            if (!_modelState.IsValid)
            {
                // TODO: does this also need to return success status?
                htmlAttributes.Add("data-form-status",
                    ToEncodedJson(FormValidationHelper.GetInvalidFormObject(_modelState, errorTitle)));
            }

            var formAction = UrlHelper.GenerateUrl(routeName, null, null, new RouteValueDictionary(), _html.RouteCollection, _html.ViewContext.RequestContext, false);

            return FormHelperImpl(_html, formAction, formMethod, htmlAttributes);
        }

        private static IHtmlString ToEncodedJson(object value)
        {
            return JsonConvert.SerializeObject(value, 
                new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() })
                .ToHtmlString();
        }

        // reflected out of System.Web.Mvc
        private static MvcForm FormHelperImpl(HtmlHelper htmlHelper, string formAction, FormMethod method, IDictionary<string, object> htmlAttributes)
        {
            var tagBuilder = new TagBuilder("form");
            tagBuilder.MergeAttributes(htmlAttributes);
            tagBuilder.MergeAttribute("action", formAction);
            tagBuilder.MergeAttribute("method", HtmlHelper.GetFormMethodString(method), true);

            var flag = htmlHelper.ViewContext.ClientValidationEnabled && !htmlHelper.ViewContext.UnobtrusiveJavaScriptEnabled;
            // if (flag) tagBuilder.GenerateId(htmlHelper.ViewContext.FormIdGenerator());
            htmlHelper.ViewContext.Writer.Write(tagBuilder.ToString(TagRenderMode.StartTag));

            var mvcForm = new MvcForm(htmlHelper.ViewContext);

            if (flag) htmlHelper.ViewContext.FormContext.FormId = tagBuilder.Attributes["id"].ToString();

            return mvcForm;
        }
    }
}