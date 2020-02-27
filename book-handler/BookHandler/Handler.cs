using System;
using System.Text;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Threading.Tasks;
using BookProcessor;
using BookTypes;
using BookInventorier;



namespace BookHandler
{


    public class Handler
    {
        private Processor bookProcessor;
        private Inventorier bookInventorier;
        public string getVersion(){
            return "1.0";
        }
        // public async Task<BookSummary> Handle(string bookSrc, List<Query> queries){
        public async Task<BookSummaryAndStructures> Handle(string bookSrc){
            
            this.bookProcessor = new Processor();
            this.bookInventorier = new Inventorier();
            string sanitizedBook = "";
            string bookID = GetHashString(bookSrc);
            string bookMeta = "";

            // Get and sanitize book
            if(bookSrc.IndexOf("http") != -1){
                sanitizedBook = await bookProcessor.FetchCorpus(bookSrc, true);
                bookMeta = bookSrc;
            }else{
                sanitizedBook = bookProcessor.Sanitize(bookSrc);
                bookMeta = bookSrc.Substring(0, 10);
            }

            // Perform inventory on book
            IDictionary<string, int> freqs;
            IDictionary<int, LinkedList<string>> lengths;
            IInventoryItem mostFrequentToken;
            IInventoryItem longestToken;
            int bookLength = 0;
            double durationMs = bookInventorier.Process(sanitizedBook, out freqs, out lengths, out mostFrequentToken, out longestToken, out bookLength);

            // Serialize data structure for db
            string strFreqs;
            string strLengths;
            bookInventorier.Serialize(freqs, lengths, out strFreqs, out strLengths);




            BookSummary bookSummary;
            
            // // Query Inventory against query parameters
            // List<IQueryResult> results = new List<IQueryResult>();
            
            // foreach(Query query in queries){
            //     results.Add(QueryWrapper(freqs, lengths, query.minLength, query.maxLength, query.topN));
            // }

            // Pack return object and leave
            bookSummary = new BookSummary(
                bookID,
                bookMeta,
                bookLength,
                freqs.Count,
                mostFrequentToken, 
                longestToken, 
                durationMs/1000, 
                new List<IQueryResult>()
                //results
            );

            BookSummaryAndStructures res = new BookSummaryAndStructures();
            res.frequencyStructure = strFreqs;
            res.lengthsStructure = strLengths;
            res.summary = bookSummary;
            return res;

        }
        public IQueryResult QueryWrapper(IDictionary<string, int> tokenToFreqDict, IDictionary<int, LinkedList<string>> lenghtToTokenDict, int minLength, int maxLength, int topNCount)
        {
            List<IInventoryItem> results;
            double durationMs = bookInventorier.Query(tokenToFreqDict, lenghtToTokenDict, minLength, maxLength, topNCount, out results);
            QueryResult res = new QueryResult(durationMs, results, minLength, maxLength, topNCount);

            return (IQueryResult)res;
        }


        public  List<IQueryResult> Query(string strTokenToFreqDict, string strLenghtToTokenDict, List<Query> queries){
            
            IDictionary<string, int> tokenToFreqDict = new Dictionary<string, int>();
            IDictionary<int, LinkedList<string>> lenghtToTokenDict = new Dictionary<int, LinkedList<string>>();
            bookInventorier.Deserialize(strTokenToFreqDict, strLenghtToTokenDict, out tokenToFreqDict, out lenghtToTokenDict);

            // Query Inventory against query parameters
            List<IQueryResult> results = new List<IQueryResult>();
            
            foreach(Query query in queries){
                results.Add(QueryWrapper(tokenToFreqDict, lenghtToTokenDict, query.minLength, query.maxLength, query.topN));
            }
            return results;
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
