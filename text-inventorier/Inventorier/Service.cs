using System;
using System.Text;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Threading.Tasks;
using WordInventoryApp;
using System.Text.RegularExpressions;


namespace WordInventoryApp
{

    /// <summary>
    /// Class meant to act as an interface to the Web Framework.
    /// This class object is used at the endpoints to be the first processing stage of incoming text or file link or to query the database for information
    /// </summary>
    public class WordInventorierService
    {


        /// <summary>
        /// Text Preprocessor contains a collection of utilities to pre-process the text before it is used
        /// </summary>
        private TextPreprocessor textPreprocessor;



        /// <summary>
        /// Text Inventorier contains the algorithm that processes the body of text and extract statistics.
        /// </summary>
        private WordInventorier textInventorier;



        /// <summary>
        /// Obtain current version of class
        /// </summary>
        public string getVersion(){
            return "1.1";
        }




        /// <summary>
        /// Constructor
        /// Initializes both dependencies the pre-processor and the inventorier
        /// </summary>
        public WordInventorierService(){
            this.textPreprocessor = new TextPreprocessor();
            this.textInventorier = new WordInventorier();
        }




        /// <summary>
        /// This function will fetch the content of document if it is a link that was provided.
        /// It will also ensure that the text is pre-processed.
        /// 
        /// The text will then be submitted to the inventory algorithm which will return a data structure
        /// summarizing the result of the inventory.
        /// This data structure is augmented iwith meta data and returned to the caller
        /// </summary>
        /// <param name="textSrc">The Text to be processed or a http link to a document that must be processed</param>
        /// <returns>Awaitable object that eventually resolves into a Data Structure that contains the summary of the inventory algorithm</returns>
        public async Task<TextSummaryAndStructures> Handle(string textSrc){
            

            string sanitizedText = "";
            string textID = GetHashString(textSrc); // hash is used as id in the db to cache the result of the processing of the input text
            string textMeta = "";

            string pattern = @"^(((https?:\/\/)|(www\.))[^\s]+)$";
            Match m = Regex.Match(textSrc, pattern, RegexOptions.IgnoreCase);

            // Get and sanitize text
            if(m.Success){
                sanitizedText = await textPreprocessor.FetchCorpus(textSrc, true);
                textMeta = textSrc;
            }else{
                sanitizedText = textPreprocessor.Sanitize(textSrc);
                textMeta = textSrc.Substring(0, textSrc.Length < 50 ? textSrc.Length : 50);
            }



            // Prepare for inventory algorithm
            IDictionary<string, int> freqs;
            IDictionary<int, LinkedList<string>> lengths;
            IInventoryItem mostFrequentToken;
            IInventoryItem longestToken;
            IInventoryItem leastFrequentToken;
            IInventoryItem shortestToken;
            int textLength = 0;

            // Perform inventory on text
            double durationMs = textInventorier.Process(sanitizedText, out freqs, out lengths, out mostFrequentToken, out longestToken, out leastFrequentToken, out shortestToken, out textLength);




            // Serialize data structure for db
            string strFreqs;
            string strLengths;
            textInventorier.Serialize(freqs, lengths, out strFreqs, out strLengths);


            // Pack summary object
            TextSummary textSummary = new TextSummary(
                textID,
                textMeta,
                textLength,
                freqs.Count,
                mostFrequentToken, 
                longestToken, 
                leastFrequentToken, 
                shortestToken, 
                durationMs/1000, 
                new List<IQueryResult>()
                //results
            );


            // Pack wrapper for summary object
            TextSummaryAndStructures res = new TextSummaryAndStructures();
            res.frequencyStructure = strFreqs;
            res.lengthsStructure = strLengths;
            res.summary = textSummary;

            // return
            return res;
        }





        /// <summary>
        /// This method is used to query the inventory summary data structure for top "N" most frequent words with lengths that are between some minimum and maximum.
        /// </summary>
        /// <param name="tokenToFreqDict">Data Structure summarizing the word frequency distribution some text</param>
        /// <param name="lenghtToTokenDict">Data Structure summarizing the word length distribution some text</param>
        /// <param name="minLength">String that determine the minimum length of words of interest</param>
        /// <param name="maxLength">String that determine the maximum length of words of interest</param>
        /// <param name="topNCount">Number that determine how many of top most frequent word with acceptable length to return</param>
        /// <returns>Result Object</returns>
        public IQueryResult QueryWrapper(IDictionary<string, int> tokenToFreqDict, IDictionary<int, LinkedList<string>> lenghtToTokenDict, int minLength, int maxLength, int topNCount)
        {
            // Perform the actual query
            List<IInventoryItem> results;
            double durationMs = textInventorier.Query(tokenToFreqDict, lenghtToTokenDict, minLength, maxLength, topNCount, out results);

            // Package result object augmented with meta data about the query
            QueryResult res = new QueryResult(durationMs, results, minLength, maxLength, topNCount);
            return (IQueryResult)res;
        }





        /// <summary>
        /// Method to query the summary data structure for top "N" most frequent words with length between some minimum and maximum
        /// </summary>
        /// <param name="tokenToFreqDict">Data Structure summarizing the word frequency distribution some text</param>
        /// <param name="lenghtToTokenDict">Data Structure summarizing the word length distribution some text</param>
        /// <param name="queries">List of Query object representing the parameters of the query (minimum length, maximum length, number of top most frequent word)</param>
        /// <returns>List of Query results</returns>
        public  List<IQueryResult> Query(string strTokenToFreqDict, string strLenghtToTokenDict, List<Query> queries){
            
            IDictionary<string, int> tokenToFreqDict = new Dictionary<string, int>();
            IDictionary<int, LinkedList<string>> lenghtToTokenDict = new Dictionary<int, LinkedList<string>>();
            textInventorier.Deserialize(strTokenToFreqDict, strLenghtToTokenDict, out tokenToFreqDict, out lenghtToTokenDict);

            // Query Inventory against query parameters
            List<IQueryResult> results = new List<IQueryResult>();
            
            foreach(Query query in queries){
                results.Add(QueryWrapper(tokenToFreqDict, lenghtToTokenDict, query.minLength, query.maxLength, query.topN));
            }
            return results;
        }




        /// <summary>
        /// Generic algorithm to compute the hash of some input according to some hashing algorithm
        /// </summary>
        /// <param name="inputString">Text to be hashed</param>
        /// <returns>Hash as a byte array</returns>
        public static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        /// <summary>
        /// Process the hash into an hexadecimal string.
        /// This is used to identify a text in the database
        /// </summary>
        /// <param name="inputString">Text to be hashed</param>
        /// <returns>Hash as string</returns>
        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }


}
