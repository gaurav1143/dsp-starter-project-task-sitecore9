using System;
using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.Predicates
{
    using System.Text.RegularExpressions;

    public static class PredicateHelper
    {
        public static IEnumerable<string> SplitToTerms(string query)
        {
            return SplitToTerms(query, 0, false);
        }

        public static IEnumerable<string> SplitToTerms(string query, int minTermLength)
        {
            return SplitToTerms(query, minTermLength, false);
        }

        public static IEnumerable<string> SplitToTerms(string query, int minTermLength, bool ignoreDigits)
        {
            if (String.IsNullOrWhiteSpace(query))
                return Enumerable.Empty<string>();

            var terms = query.Split(new[] { " " }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => x.Trim())
                .Where(s => s.Length >= minTermLength);

            if (!ignoreDigits)
                return terms;

            var digits = new Regex(@"^[0-9]+$");
            return terms.Where(s => !digits.IsMatch(s));
        }
    }
}
