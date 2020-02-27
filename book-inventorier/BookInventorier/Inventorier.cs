using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using BookTypes;

namespace BookInventorier
{





    public class Inventorier
    {
        public double Process(
                string sanitizedStr, 
                out IDictionary<string, int> tokenToFreqDict,
                out IDictionary<int, LinkedList<string>> lenghtToTokenDict,
                out IInventoryItem mostFrequentToken,
                out IInventoryItem longestToken,
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
