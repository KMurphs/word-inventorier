using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using BookTypes;

namespace BookInventorier
{




    /// <summary>
    /// Heart of the application. The class will process some text to return a dictionary of word frequencies and word lengths that summarize the text.
    /// The class also has the ability to serialize and deserialize these data structure so they can be stored (in a database) and retrieved later.
    /// It also provide method to query these structures and obtain top "N" most frequent words with lengths that are between some minimum and maximum. 
    /// </summary>
    public class Inventorier
    {

        /// <summary>
        /// Method to process the sanitized input string, and extract word frequencies and lengths information in dictionary data structures
        /// </summary>
        /// <param name="_sanitizedStr">Input string to be processed</param>
        /// <param name="tokenToFreqDict">Output Dictionary summarizing word frequency information of the input text</param>
        /// <param name="lenghtToTokenDict">Output Dictionary summarizing word lengths information of the input text</param>
        /// <param name="mostFrequentToken">Output string indicating the most frequent word in the input text</param>
        /// <param name="longestToken">Output string indicating the longest word in the input text</param>
        /// <param name="leastFrequentToken">Output string indicating the least frequent word in the input text</param>
        /// <param name="shortestToken">Output string indicating the shortest word in the input text</param>
        /// <param name="tokensCount">Output number indicating how many different words are in the input text</param>
        /// <returns>Float number indicating in ms how long the process took</returns>
        public double Process(
                string _sanitizedStr, 
                out IDictionary<string, int> tokenToFreqDict,
                out IDictionary<int, LinkedList<string>> lenghtToTokenDict,
                out IInventoryItem mostFrequentToken,
                out IInventoryItem longestToken,
                out IInventoryItem leastFrequentToken,
                out IInventoryItem shortestToken,
                out int tokensCount
        ){
            string sanitizedStr = _sanitizedStr == null ? "" : _sanitizedStr;

            // Keep track of function of execution time
            var watch = System.Diagnostics.Stopwatch.StartNew();
            
            tokenToFreqDict = new Dictionary<string, int>();
            lenghtToTokenDict = new Dictionary<int, LinkedList<string>>();

            // Tokenize input
            string[] tokens = sanitizedStr.Split(" ".ToCharArray());
            tokensCount = tokens.Length;

            // Some Meta Data about current book/corpus
            int maxFreq = Int32.MinValue;
            string maxFreqKey = "";
            int maxLen = Int32.MinValue;
            string maxLenKey = "";
            int minFreq = Int32.MaxValue;
            string minFreqKey = "";
            int minLen = Int32.MaxValue;
            string minLenKey = "";

            //Traverse tokens list in O(N)
            for(int i = 0; i < tokens.Length; i++){
                string curr = tokens[i];
                if(curr == ""){
                    tokensCount = tokensCount - 1;
                    continue;
                }

                // If a new key is found, inventory it
                if(!tokenToFreqDict.ContainsKey(curr)){

                    // Set current frequency for the new key to 1
                    tokenToFreqDict.Add(curr, 1);

                    // Keep track of key lengths
                    int tokenLength = curr.Length;
                    if(!lenghtToTokenDict.ContainsKey(tokenLength)){

                        // a dictionary of lengths tying to a linked list of keys
                        lenghtToTokenDict.Add(tokenLength, new LinkedList<string>(new List<string>(){curr}));

                        // Collect Meta Data: tracking the longest token
                        if(maxLen < tokenLength){
                            maxLen = tokenLength;
                            maxLenKey = curr;
                        }
                        // Collect Meta Data: tracking the shortest token
                        if(minLen > tokenLength){
                            minLen = tokenLength;
                            minLenKey = curr;
                        }

                    }else{

                        // the key is appended to previous keys with the same lengths
                        lenghtToTokenDict[tokenLength].AddFirst(curr);
                    }

                }else{

                    // If it's a known key, just increment its count
                    int currFreq = tokenToFreqDict[curr] + 1;
                    tokenToFreqDict[curr] = currFreq;

                    // Collect Meta Data: tracking the most frequent token
                    if(maxFreq < currFreq){
                        maxFreq = currFreq;
                        maxFreqKey = curr;
                    }
                    // Collect Meta Data: tracking the least frequent token
                    if(minFreq > currFreq){
                        minFreq = currFreq;
                        minFreqKey = curr;
                    }

                }
            }

            // Return function execution time
            watch.Stop();
            double durationMs = watch.ElapsedMilliseconds;
            Console.WriteLine($"Inventory took: {durationMs}ms");//1.7s

            // Pack Meta Data
            if(sanitizedStr == ""){
                tokensCount = 0;
                mostFrequentToken = new InventoryItem("", 0);
                leastFrequentToken = new InventoryItem("", 0);
                longestToken = new InventoryItem("", 0);
                shortestToken = new InventoryItem("", 0);
            }else{
                mostFrequentToken = new InventoryItem(maxFreqKey == "" ? minLenKey : maxFreqKey, maxFreqKey == "" ? 1 : maxFreq);
                leastFrequentToken = new InventoryItem(minFreqKey == "" ? minLenKey : minFreqKey, minFreqKey == "" ? 1 : minFreq);
                longestToken = new InventoryItem(maxLenKey, tokenToFreqDict[maxLenKey]);
                shortestToken = new InventoryItem(minLenKey, tokenToFreqDict[minLenKey]);
            }

            return durationMs;
        }























        /// <summary>
        /// Method allowing querying of the summarizing data structures for top "N" most frequent words with lengths that are between some minimum and maximum.  
        /// </summary>
        /// <param name="tokenToFreqDict">Input Dictionary summarizing word frequency information of the input text</param>
        /// <param name="lenghtToTokenDict">Input Dictionary summarizing word lengths information of the input text</param>
        /// <param name="minLength">String that determine the minimum length of words of interest</param>
        /// <param name="maxLength">String that determine the maximum length of words of interest</param>
        /// <param name="topNCount">Number that determine how many of top most frequent word with acceptable length to return</param>
        /// <param name="results">Output object containing the result of the query</param>
        /// <returns>Float number indicating in ms how long the process took</returns>
        public double Query(IDictionary<string, int> tokenToFreqDict, IDictionary<int, LinkedList<string>> lenghtToTokenDict, int minLength, int maxLength, int topNCount, out List<IInventoryItem> results){
            
            // Keep track of function of execution time
            var watch = System.Diagnostics.Stopwatch.StartNew();         

            results = new List<IInventoryItem>();


            // At any given moment in the program the first k elemtsn are the most frequent we have encountered so far
            // The last element (k+1) is a potential most frequent element - After it is added the otuput array is resrted
            // if the element sorts of bubles up so somewhere else in the output array
            // it means there was an element with a freq less than its own
            // For this to work a secondary data structure keeping track of freq is needed
            string[] sortedTokenKeys = new string[topNCount + 1];
            for(int i = 0; i < sortedTokenKeys.Length; i++){
                sortedTokenKeys[i] = "";
            }


            // Running variables
            string curr_token = "";
            string prev_token = "";
            int curr_token_freq = 0;
            int prev_token_freq = 0;


            foreach(int lengthKey in lenghtToTokenDict.Keys){
                if(lengthKey < minLength || lengthKey > maxLength){
                    continue;
                }

                var currentNode = lenghtToTokenDict[lengthKey].First;
                while ((currentNode != null)){
                    curr_token = currentNode.Value;


                    
                
                    // Now let's see if this element can bubble up from the shaky position
                    // in the top K pool (output array)
                    sortedTokenKeys[topNCount] = curr_token; // alwasy start at this shaky position


                    // let's do the magic -- bubbling up elements 
                    int curr_token_index = topNCount + 1;
                    while (curr_token_index >= 2)
                    {
                        curr_token_index--;

                        // Prepare variables of interest for the remaining of the loop
                        curr_token = sortedTokenKeys[curr_token_index];
                        prev_token = sortedTokenKeys[curr_token_index - 1];
                        curr_token = curr_token != "" && curr_token != default(string) ? curr_token : "";
                        prev_token = prev_token != "" && prev_token != default(string) ? prev_token : "";
                        curr_token_freq = tokenToFreqDict.ContainsKey(curr_token) ? tokenToFreqDict[curr_token] : 0;
                        prev_token_freq = tokenToFreqDict.ContainsKey(prev_token) ? tokenToFreqDict[prev_token] : 0;


                        //if curr element's freq is greater than its predecessor, swap
                        if (curr_token_freq > prev_token_freq)
                        {
                            sortedTokenKeys[curr_token_index] = prev_token;
                            sortedTokenKeys[curr_token_index - 1] = curr_token;
                        }
                        //if freqs are equal, ensure that element are arranged alphabetically
                        else if (curr_token_freq == prev_token_freq && String.Compare(curr_token, prev_token) < 0)
                        {
                            sortedTokenKeys[curr_token_index] = prev_token;
                            sortedTokenKeys[curr_token_index - 1] = curr_token;
                        }
                    }


                    currentNode = currentNode.Next;
                }
            }

            // Pack Query Result
            for (int j = 0; j < topNCount && sortedTokenKeys[j] != ""; ++j){
                if(sortedTokenKeys[j] != null && tokenToFreqDict.ContainsKey(sortedTokenKeys[j])){
                    // Console.Write($"{sortedTokenKeys[j]}({tokenToFreqDict[sortedTokenKeys[j]]}) -  ");
                    results.Add(new InventoryItem(sortedTokenKeys[j], tokenToFreqDict[sortedTokenKeys[j]]));
                }
            }
            // Return function execution time
            watch.Stop();
            double durationMs = watch.ElapsedMilliseconds;
            // Console.WriteLine($"Query took: {durationMs}ms");//1.7s



            return durationMs;
        }














        /// <summary>
        /// Utilitiy to deserialize the data structure summarizing the processed text.
        /// </summary>
        /// <param name="inStrFreqs">Input string representing the serialized "freqs" data structure summarizing word frequency information of the input text</param>
        /// <param name="inStrLengths">Input string representing the serialized "lengths" data structure summarizing word lengths information of the input text</param>
        /// <param name="freqs">Output Dictionary summarizing word frequencies information of the input text</param>
        /// <param name="lengths">Output Dictionary summarizing word lengths information of the input text</param>
        /// <returns>Boolean True on error. False if everything went okay </returns>
        public Boolean Deserialize(
            string inStrFreqs, 
            string inStrLengths,
            out IDictionary<string, int> freqs, 
            out IDictionary<int, LinkedList<string>> lengths){
                
            freqs = new Dictionary<string, int>();
            lengths = new Dictionary<int, LinkedList<string>>();

            Boolean hadErrors = false;
            try{
                freqs = JsonConvert.DeserializeObject<IDictionary<string, int>>(inStrFreqs);
                lengths = JsonConvert.DeserializeObject<IDictionary<int, LinkedList<string>>>(inStrLengths);
            }catch(Exception){
                // throw ex;
                hadErrors = true;
            }

            return hadErrors;
        }
        
        
        
        /// <summary>
        /// Utilities to serialize the data structure summarizing the processed text 
        /// It allows these structures to be saved in a database and retrieved later on
        /// </summary>
        /// <param name="inFreqs">Input Dictionary summarizing word frequencies information of the input text</param>
        /// <param name="inLengths">Input Dictionary summarizing word lengths information of the input text</param>
        /// <param name="strFreqs">String representing serialized "inFreqs" input</param>
        /// <param name="strLengths">String representing serialized "inLengths" input</param>
        /// <returns>Boolean True on error. False if everything went okay </returns>
        public Boolean Serialize(
            IDictionary<string, int> inFreqs, 
            IDictionary<int, LinkedList<string>> inLengths, 
            out string strFreqs, 
            out string strLengths){

            strFreqs = "";
            strLengths = "";

            Boolean hadErrors = false;
            try{
                strFreqs = JsonConvert.SerializeObject(inFreqs);
                strLengths = JsonConvert.SerializeObject(inLengths);
            }catch(Exception){
                // throw ex;
                hadErrors = true;
            }

            return hadErrors;
        }
    }
}
