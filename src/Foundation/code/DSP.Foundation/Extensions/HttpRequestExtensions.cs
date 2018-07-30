using System;
using System.Web;

namespace DSP.Foundation.Extensions
{
    public static class HttpRequestExtensions
    {
        /// <summary>
        /// Get a value from the HttpRequest checking the POSTed values and then the QueryString if not found
        /// </summary>
        /// <param name="request"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetFromRequest(this HttpRequestBase request, string key)
        {
            // the default request[key] gives precedence to the QueryString, which breaks things for us.
            var value = request.HttpMethod.Equals("POST", StringComparison.OrdinalIgnoreCase)
                ? request.Form[key] ?? request[key]
                : request[key];

            return value ?? "";
        }
    }
}
