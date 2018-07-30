using System;
using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.Predicates
{
    using System.Linq.Expressions;

    using ContentSearch;

    using Filters;

    using Sitecore.ContentSearch.Linq;
    using Sitecore.ContentSearch.Linq.Utilities;
    using Sitecore.ContentSearch.SearchTypes;
    using Sitecore.Data;

    public static class PredicateExtensions
    {
        public static Expression<Func<T, bool>> AndAllContent<T>(
            this Expression<Func<T, bool>> predicate,
            IEnumerable<string> terms) where T : SearchResultItem
        {
            if (terms == null) return predicate;

            foreach (var term in terms)
            {
                var t = term;
                predicate = predicate.And(p => p.Content == t);
            }

            return predicate;
        }

        public static Expression<Func<T, bool>> OrAnyContent<T>(
            this Expression<Func<T, bool>> predicate,
            IEnumerable<string> terms) where T : SearchResultItem
        {
            if (terms == null) return predicate;

            var enumerable = terms as string[] ?? terms.ToArray();

            if (!enumerable.Any()) return predicate;

            var anyPredicate = PredicateBuilder.False<T>();

            foreach (var term in enumerable)
            {
                var t = term;
                anyPredicate = anyPredicate.Or(p => p.Content == t);
            }

            return predicate.Or(anyPredicate);
        }

        public static Expression<Func<T, bool>> AndNotAllContent<T>(
            this Expression<Func<T, bool>> predicate,
            IEnumerable<string> terms) where T : SearchResultItem
        {
            if (terms == null) return predicate;

            foreach (var term in terms)
            {
                var t = term;
                predicate = predicate.And(p => p.Content != t);
            }

            return predicate;
        }

        public static Expression<Func<T, bool>> AndAllBoostedContent<T>(this Expression<Func<T, bool>> predicate, IEnumerable<string> terms)
            where T : LuceneSearchResultItem
        {
            if (terms == null) return predicate;

            foreach (var term in terms)
            {
                var t = term;
                predicate = predicate.And(p => p.BoostedContent == t);
            }

            return predicate;
        }

        public static Expression<Func<T, bool>> AndAllContentOrBoostedContent<T>(
           this Expression<Func<T, bool>> predicate, IEnumerable<string> terms)
           where T : LuceneSearchResultItem
        {
            if (terms == null) return predicate;

            var termsEnumerated = terms as string[] ?? terms.ToArray();

            var andPredicate1 = PredicateBuilder.True<T>().AndAllContent(termsEnumerated);
            var andPredicate2 = PredicateBuilder.True<T>().AndAllBoostedContent(termsEnumerated);

            var anyPredicate = PredicateBuilder.False<T>();
            anyPredicate = anyPredicate.Or(andPredicate1);
            anyPredicate = anyPredicate.Or(andPredicate2);

            return predicate.And(anyPredicate);
        }

        public static Expression<Func<T, bool>> AndAllContentOrBoostedContentOrAutocompleteTitle<T>(
            this Expression<Func<T, bool>> predicate, IEnumerable<string> terms)
            where T : LuceneSearchResultItem
        {
            if (terms == null) return predicate;

            var termsEnumerated = terms as string[] ?? terms.ToArray();

            var andPredicate1 = PredicateBuilder.True<T>().AndAllContent(termsEnumerated);
            var andPredicate2 = PredicateBuilder.True<T>().AndAllBoostedContent(termsEnumerated);
            var andPredicate3 = PredicateBuilder.True<T>().AndAllAutocomplete(termsEnumerated);

            var anyPredicate = PredicateBuilder.False<T>();
            anyPredicate = anyPredicate.Or(andPredicate1);
            anyPredicate = anyPredicate.Or(andPredicate2);
            anyPredicate = anyPredicate.Or(andPredicate3);

            return predicate.And(anyPredicate);
        }

        public static Expression<Func<T, bool>> AndAllAutocomplete<T>(
            this Expression<Func<T, bool>> predicate, IEnumerable<string> terms)
            where T : LuceneSearchResultItem
        {

            if (terms == null) return predicate;

            var allPredicate = PredicateBuilder.True<T>();

            var termsArray = terms as string[] ?? terms.ToArray();

            foreach (var term in termsArray)
            {
                // only search for min 3 characters
                if (term.Length >= 3)
                {
                    var term1 = term;
                    allPredicate = allPredicate.And(p => p.AutocompleteTitle == term1);
                }
            }

            return predicate.And(allPredicate);
        }

        public static Expression<Func<T, bool>> AndAllContentTags<T>(this Expression<Func<T, bool>> predicate, IEnumerable<string> tagShortIds)
            where T : LuceneSearchResultItem
        {
            if (tagShortIds == null) return predicate;

            foreach (var tagValue in tagShortIds)
            {
                // expected content tag value is a short guid, 32 characters
                if (tagValue.Length != 32) continue;

                Guid value;
                if (Guid.TryParseExact(tagValue, "N", out value))
                {
                    // cannot use constructor inside expression so get the ID value outside
                    // e.g. can't do this:
                    // predicate = predicate.And(p => p.ContentTagsFacet.Contains(new ID(value)));
                    var id = new ID(value);
                    predicate = predicate.And(p => p.ContentTagsFacet.Contains(id));
                }
            }

            return predicate;
        }

        public static Expression<Func<T, bool>> OrAnyContentTags<T>(this Expression<Func<T, bool>> predicate, IEnumerable<string> tagShortIds)
           where T : LuceneSearchResultItem
        { 
            if (tagShortIds == null) return predicate;

            var anyPredicate = PredicateBuilder.False<T>();
            var predicateFound = false;

            foreach (var tag in tagShortIds)
            {
                // expected content tag value is a short guid, 32 characters
                if (tag.Length != 32) continue;

                Guid value;
                if (!Guid.TryParseExact(tag, "N", out value)) continue;

                var id = new ID(value);
                anyPredicate = anyPredicate.Or(p => p.ContentTagsFacet.Contains(id));
                predicateFound = true;
            }

            return predicateFound ? predicate.Or(anyPredicate) : predicate;
        }

        public static Expression<Func<T, bool>> OrAnyAutomatedTags<T>(this Expression<Func<T, bool>> predicate, IEnumerable<string> tagShortIds)
            where T : LuceneSearchResultItem
        {
            if (tagShortIds == null) return predicate;

            var anyPredicate = PredicateBuilder.False<T>();
            var predicateFound = false;

            foreach (var tag in tagShortIds)
            {
                // expected content tag value is a short guid, 32 characters
                if (tag.Length != 32) continue;

                var id = tag;
                anyPredicate = anyPredicate.Or(p => p.AutomatedTags.Contains(id));
                predicateFound = true;
            }

            return predicateFound ? predicate.Or(anyPredicate) : predicate;
        }

        public static Expression<Func<T, bool>> AndAllAutomatedTags<T>(this Expression<Func<T, bool>> predicate, IEnumerable<string> tagValues)
            where T : LuceneSearchResultItem
        {
            if (tagValues == null) return predicate;

            foreach (var tagValue in tagValues)
            {
                // expected automated tag value is a short guid, 32 characters and then some value
                // the automated tag value should be nnnn(32 times)_value
                if (tagValue.Length <= 32) continue;

                var value = tagValue;
                predicate = predicate.And(p => p.AutomatedTags.Contains(value));
            }

            return predicate;
        }

        public static IQueryable<T> AddFilter<T>(this IQueryable<T> queryable, ISearchFilter<T> filter)
            where T : SearchResultItem
        {
            queryable = queryable.Filter(filter.Filter());

            return queryable;
        }

        public static Expression<Func<T, bool>> OrAnyTemplate<T>(
            this Expression<Func<T, bool>> predicate,
            IEnumerable<string> templateIds) where T : SearchResultItem
        {
            if (templateIds == null) return predicate;

            var anyPredicate = PredicateBuilder.False<T>();
            var predicateFound = false;

            foreach (var tag in templateIds)
            {
                ID t;
                if (!ID.TryParse(tag, out t)) continue;

                anyPredicate = anyPredicate.Or(p => p.TemplateId == t);
                predicateFound = true;
            }

            return predicateFound ? predicate.Or(anyPredicate) : predicate;
        }
    }
}
