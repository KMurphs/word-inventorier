using System;
using System.Security.Cryptography;
using BookProcessor;



namespace BookHandler
{
    interface IRecordUnit
    {
        string key { get; }
        string frequency { get; }
        string length { get; }

    }
    public struct RecordUnit: IRecordUnit{
        public RecordUnit(string key, int frequency){
            key = key;
            frequency = frequency;
            length = key.Length;
        }
        string key { get; }
        string frequency { get; }
        string length { get; }
        
        public override string ToString(Boolean addNewLine = false) => $"Record entry is for token '{key}' \t Occurs '{frequency}' times in corpus \t Token has {length}characters {(addNewLine?Environment.NewLine:"")}";
    }
    public struct BookSummary{
        public BookSummary(string id, int wordsCount, int uniqueWordsCount, RecordUnit mostFrequentWord, RecordUnit longestWord, double summaryDurationSec, RecordUnit[] results)
        {
            id = id;
            idType = id.IndexOf("http") == -1 ? "book-hash" : "book-url";
            wordsCount  = wordsCount;
            uniqueWordsCount  = uniqueWordsCount;
            mostFrequentWord  = mostFrequentWord;
            longestWord  = longestWord;
            summaryDurationSec  = summaryDurationSec;
            results = results;
        }

        public string id { get; }
        public string idType { get; }
        public int wordsCount { get; }
        public int uniqueWordsCount { get; }
        public RecordUnit mostFrequentWord { get; }
        public RecordUnit longestWord { get; }
        public double summaryDurationSec { get; }
        public RecordUnit[] results {get; }
        public override string ToString() {
            string resAggregation = "";
            foreach(RecordUnit res in results){
                resAggregation = resAggregation + results.ToString(true);
            }
            return $@"
                \nThe book has id: '{id}' (idType) with '{wordsCount}' entries and '{uniqueWordsCount}' different ones.
                \nThe book was processed in '{summaryDurationSec}' seconds
                \nMost Frequent Record: {mostFrequentWord.ToString()}
                \nLongest Record: {longestWord.ToString()}
                \nQueries Records: \n{resAggregation}
            ";
        } 
    } 
    public class Handler
    {
        public async Task<BookSummary> Handle(string bookSrc, int topN_inFreq = 50, int topN_inFreqLongerthan_L = 50, int Length_L = 6){
            BookSummary book;
            Processor bookProcessor = new Processor();
            Inventorier bookInventorier = new Inventorier();
            string sanitizedBook = "";
            string bookID = "";

            // Get and sanitize book
            if(bookSrc.IndexOf("http")){
                sanitizedBook = await bookProcessor.FetchCorpus(bookSrc, true);
                bookID = bookSrc;
            }else{
                sanitizedBook = bookProcessor.Sanitize(bookSrc);
                bookID = GetHashString(bookSrc);
            }

            // Perform inventory on book
            Dictionary<string, int> freqs;
            Dictionary<int, LinkedList<string>> lengths;
            IRecordUnit mostFrequentToken;
            IRecordUnit longestToken;
            int bookLength = 0;
            double durationMs = bookInventorier.Process(sanitizedBook, out freqs, out lengths, out bookLength, out mostFrequentToken, out longestToken);


            // 





            RecordUnit[] results = new Array[RecordUnit]();
            book = new BookSummary(
                bookID,
                bookLength,
                freqs.Count,
                durationMs/1000, 
                mostFrequentWord, 
                longestWord, 
                results
            );
            return book;

        }

        public static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }


}
