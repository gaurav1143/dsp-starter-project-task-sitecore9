using System.Linq;
using System.Text.RegularExpressions;

namespace DSP.Foundation.Forms.DisplayName
{
    public class DisplayNameProvider : IDisplayNameProvider
    {
        /// <summary>
        /// Convert the a PascalCased string to a sentance, .e.g. MyPascalCaseString => My pascal case string
        /// </summary>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public string GetName(string propertyName)
        {
            return PascalCaseToSentance(propertyName);
        }

        private const string PascalCaseMatchRegex = "([A-Z]+(?=$|[A-Z][a-z])|[A-Z]?[a-z]+)";
        private static string PascalCaseToSentance(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return "";

            var words = Regex
                .Matches(value, PascalCaseMatchRegex)
                .Cast<Match>()
                .Select(match => match.Value)
                .ToList();

            var result = new[] { words.First() }.Concat(words.Skip(1).Select(s => s.ToLowerInvariant()));

            // MyPascalCaseString => My pascal case string
            return string.Join(" ", result);
        }
    }
}