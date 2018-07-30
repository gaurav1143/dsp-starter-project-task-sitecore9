using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Web;
using System.Web.Mvc;
using HtmlHelper = System.Web.WebPages.Html.HtmlHelper;

namespace DSP.Foundation.Forms
{
    // reflected out System.Web.Mvc
    // in this instance we store attributes as IDictionary<string, object>
    // so we can test for IHtmlString when rendering
    // if it is IHtmlString then we do not Encode the value
    internal class TagBuilder 
    {
        private string _idAttributeDotReplacement;
        private string _innerHtml;

        public IDictionary<string, object> Attributes { get; private set; }

        public string IdAttributeDotReplacement
        {
            get
            {
                if (string.IsNullOrEmpty(this._idAttributeDotReplacement))
                    this._idAttributeDotReplacement = HtmlHelper.IdAttributeDotReplacement;
                return this._idAttributeDotReplacement;
            }
            set
            {
                this._idAttributeDotReplacement = value;
            }
        }

        public string InnerHtml
        {
            get
            {
                return this._innerHtml ?? string.Empty;
            }
            set
            {
                this._innerHtml = value;
            }
        }

        public string TagName { get; private set; }

        public TagBuilder(string tagName)
        {
            if (string.IsNullOrEmpty(tagName))
                throw new ArgumentException("tagName");
            this.TagName = tagName;
            this.Attributes = (IDictionary<string, object>)new SortedDictionary<string, object>((IComparer<string>)StringComparer.Ordinal);
        }

        public void AddCssClass(string value)
        {
            object str;
            if (this.Attributes.TryGetValue("class", out str))
                this.Attributes["class"] = value + " " + str;
            else
                this.Attributes["class"] = value;
        }

        public static string CreateSanitizedId(string originalId)
        {
            return TagBuilder.CreateSanitizedId(originalId, HtmlHelper.IdAttributeDotReplacement);
        }

        public static string CreateSanitizedId(string originalId, string invalidCharReplacement)
        {
            if (string.IsNullOrEmpty(originalId))
                return (string)null;
            if (invalidCharReplacement == null)
                throw new ArgumentNullException("invalidCharReplacement");
            char c1 = originalId[0];
            if (!TagBuilder.Html401IdUtil.IsLetter(c1))
                return (string)null;
            StringBuilder stringBuilder = new StringBuilder(originalId.Length);
            stringBuilder.Append(c1);
            for (int index = 1; index < originalId.Length; ++index)
            {
                char c2 = originalId[index];
                if (TagBuilder.Html401IdUtil.IsValidIdCharacter(c2))
                    stringBuilder.Append(c2);
                else
                    stringBuilder.Append(invalidCharReplacement);
            }
            return stringBuilder.ToString();
        }

        public void GenerateId(string name)
        {
            if (this.Attributes.ContainsKey("id"))
                return;
            string sanitizedId = TagBuilder.CreateSanitizedId(name, this.IdAttributeDotReplacement);
            if (string.IsNullOrEmpty(sanitizedId))
                return;
            this.Attributes["id"] = sanitizedId;
        }

        private void AppendAttributes(StringBuilder sb)
        {
            foreach (KeyValuePair<string, object> keyValuePair in (IEnumerable<KeyValuePair<string, object>>)this.Attributes)
            {
                var key = keyValuePair.Key;

                if (keyValuePair.Value is IHtmlString)
                {
                    var value = keyValuePair.Value.ToString();

                    if (!string.IsNullOrWhiteSpace(value))
                    {
                        // render IHtmlStrings as key='value'
                        // this will allow us to render valid JSON
                        sb.Append(' ').Append(key).Append("='").Append(keyValuePair.Value).Append('\'');
                    }

                    continue;
                }

                if (!string.Equals(key, "id", StringComparison.Ordinal) || !string.IsNullOrEmpty((string)keyValuePair.Value))
                {
                    string str = HttpUtility.HtmlAttributeEncode((string)keyValuePair.Value);
                    sb.Append(' ').Append(key).Append("=\"").Append(str).Append('"');
                }
            }
        }

        public void MergeAttribute(string key, string value)
        {
            this.MergeAttribute(key, value, false);
        }

        public void MergeAttribute(string key, object value, bool replaceExisting)
        {
            if (string.IsNullOrEmpty(key))
                throw new ArgumentException("key");
            if (!replaceExisting && this.Attributes.ContainsKey(key))
                return;
            this.Attributes[key] = value;
        }

        public void MergeAttributes<TKey, TValue>(IDictionary<TKey, TValue> attributes)
        {
            this.MergeAttributes<TKey, TValue>(attributes, false);
        }

        public void MergeAttributes<TKey, TValue>(IDictionary<TKey, TValue> attributes, bool replaceExisting)
        {
            if (attributes == null) return;

            foreach (KeyValuePair<TKey, TValue> keyValuePair in (IEnumerable<KeyValuePair<TKey, TValue>>) attributes)
            {
                if (keyValuePair.Value is IHtmlString)
                {
                    this.MergeAttribute(
                    Convert.ToString((object)keyValuePair.Key, (IFormatProvider)CultureInfo.InvariantCulture),
                    keyValuePair.Value,
                    replaceExisting);
                    continue;
                }

                this.MergeAttribute(
                    Convert.ToString((object) keyValuePair.Key, (IFormatProvider) CultureInfo.InvariantCulture),
                    Convert.ToString((object)keyValuePair.Value, (IFormatProvider)CultureInfo.InvariantCulture),
                    replaceExisting);
            }
        }

        public void SetInnerText(string innerText)
        {
            this.InnerHtml = HttpUtility.HtmlEncode(innerText);
        }

        internal HtmlString ToHtmlString(TagRenderMode renderMode)
        {
            return new HtmlString(this.ToString(renderMode));
        }

        public override string ToString()
        {
            return this.ToString(TagRenderMode.Normal);
        }

        public string ToString(TagRenderMode renderMode)
        {
            StringBuilder sb = new StringBuilder();
            switch (renderMode)
            {
                case TagRenderMode.StartTag:
                    sb.Append('<').Append(this.TagName);
                    this.AppendAttributes(sb);
                    sb.Append('>');
                    break;
                case TagRenderMode.EndTag:
                    sb.Append("</").Append(this.TagName).Append('>');
                    break;
                case TagRenderMode.SelfClosing:
                    sb.Append('<').Append(this.TagName);
                    this.AppendAttributes(sb);
                    sb.Append(" />");
                    break;
                default:
                    sb.Append('<').Append(this.TagName);
                    this.AppendAttributes(sb);
                    sb.Append('>').Append(this.InnerHtml).Append("</").Append(this.TagName).Append('>');
                    break;
            }
            return sb.ToString();
        }

        private static class Html401IdUtil
        {
            private static bool IsAllowableSpecialCharacter(char c)
            {
                switch (c)
                {
                    case '-':
                    case ':':
                    case '_':
                        return true;
                    default:
                        return false;
                }
            }

            private static bool IsDigit(char c)
            {
                if (48 <= (int)c)
                    return (int)c <= 57;
                return false;
            }

            public static bool IsLetter(char c)
            {
                if (65 <= (int)c && (int)c <= 90)
                    return true;
                if (97 <= (int)c)
                    return (int)c <= 122;
                return false;
            }

            public static bool IsValidIdCharacter(char c)
            {
                if (!TagBuilder.Html401IdUtil.IsLetter(c) && !TagBuilder.Html401IdUtil.IsDigit(c))
                    return TagBuilder.Html401IdUtil.IsAllowableSpecialCharacter(c);
                return true;
            }
        }

    }
}