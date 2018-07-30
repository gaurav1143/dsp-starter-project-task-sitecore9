namespace DSP.Business.Search.Analyzers
{
    using System.IO;

    using Lucene.Net.Analysis;
    using Lucene.Net.Analysis.NGram;
    using Lucene.Net.Analysis.Standard;
    using Lucene.Net.Util;

    public class AutocompleteNGramAnalyzer : Analyzer
    {
        private readonly Version version;
        private readonly int minGram;
        private readonly int maxGram;

        public AutocompleteNGramAnalyzer(Version matchVersion, string minGram, string maxGram)
        {
            this.version = matchVersion;
            this.minGram = int.Parse(minGram);
            this.maxGram = int.Parse(maxGram);
        }

        /// <summary>
        /// Tokenizes a field for use in an autocomplete search. Ref DOH-893.
        /// Inspiration taken from:
        /// https://github.com/Sitecore/autohaus/blob/master/Autohaus.Custom/Indexing/Analyzers/NGramAnalyzer.cs
        /// http://stackoverflow.com/a/9183416
        /// </summary>
        public override TokenStream TokenStream(string fieldName, TextReader reader)
        {
            // This should be a good tokenizer for most European-language documents:
            // Splits words at punctuation characters, removing punctuation.
            // Splits words at hyphens, unless there's a number in the token...
            // Recognizes email addresses and internet hostnames as one token.
            TokenStream tokenStream = new StandardTokenizer(this.version, reader);

            // apply a set of standard filters
            tokenStream = new StandardFilter(tokenStream);
            tokenStream = new LowerCaseFilter(tokenStream);

            // This class converts alphabetic, numeric, and symbolic Unicode characters 
            // which are not in the first 127 ASCII characters (the "Basic Latin" Unicode 
            // block) into their ASCII equivalents, if one exists. 
            tokenStream = new ASCIIFoldingFilter(tokenStream);
            tokenStream = new StopFilter(false, tokenStream, StopAnalyzer.ENGLISH_STOP_WORDS_SET);

            // apply the EdgeNGramTokenFilter
            // this turns each token into a set of prefixes, e.g. 
            // "South Melbourne" will be turned into "Sou South Mel Melb Melb ..."
            tokenStream = new EdgeNGramTokenFilter(tokenStream, Side.FRONT, this.minGram, this.maxGram);

            // Removes stop words from a token stream.
            return tokenStream;
        }
    }
}
