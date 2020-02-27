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
        public async Task<BookSummary> Handle(string bookSrc, int topN_inFreq = 50, int topN_inFreqLongerthan_L = 50, int Length_L = 6){
            BookSummary bookSummary;
            this.bookProcessor = new Processor();
            this.bookInventorier = new Inventorier();
            string sanitizedBook = "";
            string bookID = "";

            // Get and sanitize book
            if(bookSrc.IndexOf("http") != -1){
                sanitizedBook = await bookProcessor.FetchCorpus(bookSrc, true);
                bookID = bookSrc;
            }else{
                sanitizedBook = bookProcessor.Sanitize(bookSrc);
                bookID = GetHashString(bookSrc);
            }

            // Perform inventory on book
            IDictionary<string, int> freqs;
            IDictionary<int, LinkedList<string>> lengths;
            IInventoryItem mostFrequentToken;
            IInventoryItem longestToken;
            int bookLength = 0;
            double durationMs = bookInventorier.Process(sanitizedBook, out freqs, out lengths, out mostFrequentToken, out longestToken, out bookLength);


            // Query Inventory against query parameters
            List<IQueryResult> results = new List<IQueryResult>();
            results.Add(QueryWrapper(freqs, lengths, 0, topN_inFreq));
            results.Add(QueryWrapper(freqs, lengths, Length_L, topN_inFreqLongerthan_L));

            

            // Pack return object and leave
            bookSummary = new BookSummary(
                bookID,
                bookLength,
                freqs.Count,
                mostFrequentToken, 
                longestToken, 
                durationMs/1000, 
                results
            );
            return bookSummary;

        }
        public IQueryResult QueryWrapper(IDictionary<string, int> tokenToFreqDict, IDictionary<int, LinkedList<string>> lenghtToTokenDict, int minLength, int topNCount)
        {
            List<IInventoryItem> results;
            double durationMs = bookInventorier.Query(tokenToFreqDict, lenghtToTokenDict, minLength, topNCount, out results);
            QueryResult res = new QueryResult(durationMs, results);

            return (IQueryResult)res;
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
