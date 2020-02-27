using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BookInventorier
{

    public struct InventoryItem{
        public InventoryItem(string _key, int _frequency){
            key = _key;
            frequency = _frequency;
            length = _key.Length;
        }
        public string key { get; }
        public int frequency { get; }
        public int length { get; }
        public string ToString(Boolean addNewLine = false) => $"Record entry is for token '{key}' \t Occurs '{frequency}' times in corpus \t Token has {length}characters {(addNewLine?Environment.NewLine:"")}";
    }



    public class Inventorier
    {
        public double Process(
                string sanitizedStr, 
                out IDictionary<string, int> tokenToFreqDict,
                out IDictionary<int, LinkedList<string>> lenghtToTokenDict,
                out InventoryItem mostFrequentToken,
                out InventoryItem longestToken,
                out int tokensCount
        ){
            // Keep track of function of execution time
            var watch = System.Diagnostics.Stopwatch.StartNew();
            
            tokenToFreqDict = new Dictionary<string, int>();
            lenghtToTokenDict = new Dictionary<int, LinkedList<string>>();

            // Tokenize input
            string[] tokens = sanitizedStr.Split(" ".ToCharArray());
            tokensCount = tokens.Length;

            // Some Meta Data about current book/corpus
            int maxFreq = 0;
            string maxFreqKey = "";
            int maxLen = 0;
            string maxLenKey = "";

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

                }
            }

            // Return function execution time
            watch.Stop();
            double durationMs = watch.ElapsedMilliseconds;
            Console.WriteLine($"Inventory took: {durationMs}ms");//1.7s

            // Pack Meta Data
            mostFrequentToken = new InventoryItem(maxFreqKey, maxFreq);
            longestToken = new InventoryItem(maxLenKey, tokenToFreqDict[maxLenKey]);

            return durationMs;
        }


        public List<InventoryItem> Query(IDictionary<string, int> tokenToFreqDict, IDictionary<int, LinkedList<string>> lenghtToTokenDict, int minLength, int topNCount){
            
            List<InventoryItem> res = new List<InventoryItem>();


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
                if(lengthKey < minLength){
                    continue;
                }

                var currentNode = lenghtToTokenDict[lengthKey].First;
                while ((currentNode != null)){
                    curr_token = currentNode.Value;
                    // Console.Write($"---->{currentNode.Value}\n");

                    

                
                    // Now let's see if this element can bubble up from the shaky position
                    // in the top K pool (output array)
                    sortedTokenKeys[topNCount] = curr_token; // alwasy start by this shaky position
                    // Console.Write($"-->{string.Join(",", sortedTokenKeys)}\n");

                    // let's do the magic -- bubbling up elements since either a new one is sitting at the back, 
                    // or the previous instance has just had its frequency increased
                    // We only need to bubble from the position of the curr element towards the up direction
                    int curr_token_index = topNCount + 1;
                    while (curr_token_index >= 2)
                    {
                        curr_token_index--;
                        curr_token = sortedTokenKeys[curr_token_index];
                        prev_token = sortedTokenKeys[curr_token_index - 1];
                        curr_token = curr_token != "" && curr_token != default(string) ? curr_token : "";
                        prev_token = prev_token != "" && prev_token != default(string) ? prev_token : "";
                        curr_token_freq = tokenToFreqDict.ContainsKey(curr_token) ? tokenToFreqDict[curr_token] : 0;
                        prev_token_freq = tokenToFreqDict.ContainsKey(prev_token) ? tokenToFreqDict[prev_token] : 0;
                        // Console.Write($"-->Curr: {curr_token} -- {curr_token_freq}\n");
                        // Console.Write($"-->Prev: {prev_token} -- {prev_token_freq}\n");
                        // Console.Write($"-->Compare: {curr_token_freq > prev_token_freq}\n");

                        //if curr element's freq is greater than its predecessor, swap
                        if (curr_token_freq > prev_token_freq)
                        {
                            // Console.WriteLine($"Swapping {curr_token}({curr_token_freq}) and {prev_token}({prev_token_freq})");
                            sortedTokenKeys[curr_token_index] = prev_token;
                            sortedTokenKeys[curr_token_index - 1] = curr_token;
                        }
                        else if (curr_token_freq == prev_token_freq && String.Compare(curr_token, prev_token) < 0)
                        {
                            // Console.WriteLine($"Swapping {curr_token}({curr_token_freq}) and {prev_token}({prev_token_freq})");
                            sortedTokenKeys[curr_token_index] = prev_token;
                            sortedTokenKeys[curr_token_index - 1] = curr_token;
                        }
                        // Console.Write($"-->{string.Join(",", sortedTokenKeys)}\n");

                    }


                    // print top k elements 
                    // Console.WriteLine($"top has {sortedTokenKeys.Length} elements");
                    // for (int j = 0; j < topNCount && sortedTokenKeys[j] != ""; ++j){
                    //     if(sortedTokenKeys[j] != null && tokenToFreqDict.ContainsKey(sortedTokenKeys[j])){
                    //         Console.Write($"{sortedTokenKeys[j]}({tokenToFreqDict[sortedTokenKeys[j]]}) -  ");
                    //     }
                    // }
                        


                    // Console.Write(Environment.NewLine);
                    currentNode = currentNode.Next;
                }
            }

            for (int j = 0; j < topNCount && sortedTokenKeys[j] != ""; ++j){
                if(sortedTokenKeys[j] != null && tokenToFreqDict.ContainsKey(sortedTokenKeys[j])){
                    Console.Write($"{sortedTokenKeys[j]}({tokenToFreqDict[sortedTokenKeys[j]]}) -  ");
                    res.Add(new InventoryItem(sortedTokenKeys[j], tokenToFreqDict[sortedTokenKeys[j]]));
                }
            }

            Console.Write(Environment.NewLine);


            return res;
        }

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
