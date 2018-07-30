namespace DSP.Business.Search.Analyzers
{
    using System.IO;
    using System.Collections.Generic;
    using System.Web.Hosting;

    using Lucene.Net.Analysis;
    using Lucene.Net.Analysis.Standard;
    using Lucene.Net.Util;

    public class StandardAnalyzerWithStemming : StandardAnalyzer
    {
        public StandardAnalyzerWithStemming(Version matchVersion)
            : base(matchVersion)
        {
        }

        public StandardAnalyzerWithStemming(Version matchVersion, ISet<string> stopWords)
            : base(matchVersion, stopWords)
        {
        }

        public StandardAnalyzerWithStemming(Version matchVersion, FileInfo stopwords)
            : base(matchVersion, stopwords)
        {
        }

        public StandardAnalyzerWithStemming(Version matchVersion, TextReader stopwords)
            : base(matchVersion, stopwords)
        {
        }

        public StandardAnalyzerWithStemming(Version matchVersion, string stopWordsFileRelativePath)
            : base(matchVersion, new FileInfo(HostingEnvironment.MapPath(stopWordsFileRelativePath)))
        {
        }

        public override TokenStream TokenStream(string fieldName, TextReader reader)
        {
            var baseTokenStream = base.TokenStream(fieldName, reader);
            return new PorterStemFilter(baseTokenStream);
        }
    }
}
