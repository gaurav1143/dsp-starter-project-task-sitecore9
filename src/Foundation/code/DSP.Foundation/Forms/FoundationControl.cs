using System;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using DSP.Foundation.SitecoreAbstractions;
using DSP.Foundation.Forms.DisplayName;
using DSP.Foundation.Forms.Validation;

namespace DSP.Foundation.Forms
{
    public partial class FoundationControl<TModel>
    {
        private readonly IDisplayNameProvider _displayNameProvider;
        private readonly ViewDataDictionary<TModel> _viewData;
        private readonly TemplateInfo _info = new TemplateInfo();
        private readonly HtmlHelper<TModel> _html;
        private readonly ModelStateDictionary _modelState;
        private readonly ValidationRulesProvider _validationRulesProvider = new ValidationRulesProvider();
        private readonly ISitecoreContext _sitecoreContext;

        public FoundationControl(IDisplayNameProvider displayNameProvider, HtmlHelper<TModel> html, ISitecoreContext sitecoreContext)
        {
            _html = html;
            _sitecoreContext = sitecoreContext;
            _displayNameProvider = displayNameProvider;
            _viewData = html.ViewData;
            _modelState = html.ViewData.ModelState;
        }

        public bool IsPageEditor()
        {
            return _sitecoreContext.IsPageEditor;
        }

        public bool IsSitecore()
        {
            return _sitecoreContext.IsSitecore;
        }

        public IHtmlString ValidationSummary()
        {
            return new HtmlString("<div class=\"js-validate-summary\"></div>");
        }

        private ControlModel<TProperty> GetModel<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var meta = ModelMetadata.FromLambdaExpression(expression, _viewData);
            var name = GetName(expression);

            var model = new ControlModel<TProperty>(
                GetId(expression),
                name,
                (TProperty)meta.Model,
                GetDisplayName(meta.DisplayName, meta.PropertyName),
                _validationRulesProvider.GetRulesForProperty(meta.ContainerType, meta.PropertyName),
                GetLabelOption(meta.ContainerType, meta.PropertyName));

            return model;
        }

        private static LabelOption GetLabelOption(Type modelType, string propertyName)
        {
            var option = modelType.GetProperty(propertyName)
                .GetCustomAttributes(typeof(LabelOptionAttribute), false)
                .Cast<LabelOptionAttribute>()
                .FirstOrDefault();

            return option?.LabelOption ?? LabelOption.None;
        }

        private static ControlModel<TProperty> ApplyRequiredRule<TProperty>(ControlModel<TProperty> model, bool isRequired)
        {
            if (isRequired) model.AddRule("required", "This field is required");

            return model;
        }

        private string GetDisplayName(string displayName, string propertyName)
        {
            return string.IsNullOrWhiteSpace(displayName)
                ? _displayNameProvider.GetName(propertyName)
                : displayName;
        }

        private string GetId<TPoperty>(Expression<Func<TModel, TPoperty>> expression)
        {
            return _info.GetFullHtmlFieldId(ExpressionHelper.GetExpressionText(expression));
        }

        private string GetName<TPoperty>(Expression<Func<TModel, TPoperty>> expression)
        {
            return _info.GetFullHtmlFieldName(ExpressionHelper.GetExpressionText(expression));
        }
    }
}