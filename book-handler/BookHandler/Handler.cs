using System;
using System.Security.Cryptography;
using BookProcessor;
using BookTypes;
using BookInventorier;



namespace BookHandler
{


    public class Handler
    {
        public async Task<BookSummary> Handle(string bookSrc, int topN_inFreq = 50, int topN_inFreqLongerthan_L = 50, int Length_L = 6){
            BookSummary bookSummary;
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


            // Query Inventory against query parameters
            List<IQueryResult> results = new List<IQueryResult>();
            results.Add(QueryWrapper(freqs, lengths, 0, topN_inFreq));
            results.Add(QueryWrapper(freqs, Length_L, 0, topN_inFreqLongerthan_L));

            

            // Pack return object and leave
            bookSummary = new BookSummary(
                bookID,
                bookLength,
                freqs.Count,
                durationMs/1000, 
                mostFrequentWord, 
                longestWord, 
                results
            );
            return bookSummary;

        }
        public QueryResult QueryWrapper(IDictionary<string, int> tokenToFreqDict, IDictionary<int, LinkedList<string>> lenghtToTokenDict, int minLength, int topNCount)
        {
            List<IInventoryItem> results;
            double durationMs = bookInventorier.Query(tokenToFreqDict, lenghtToTokenDict, minLength, topNCount, out results);
            QueryResult res = new QueryResult(durationMs, results);

            return res;
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
