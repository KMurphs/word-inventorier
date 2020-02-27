using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BookInventorier
{
    public struct TInventoryItem{
        public int Frequency;
        public int Length;

    }
    public class Inventorier
    {
        public double Process(
                string sanitizedStr, 
                out IDictionary<string, int> tokenToFreqDict,
                out IDictionary<int, LinkedList<string>> lenghtToTokenDict
        ){
            // Keep track of function of execution time
            var watch = System.Diagnostics.Stopwatch.StartNew();
            
            tokenToFreqDict = new Dictionary<string, int>();
            lenghtToTokenDict = new Dictionary<int, LinkedList<string>>();

            // Tokenize input
            string[] tokens = sanitizedStr.Split(" ".ToCharArray());

            //Traverse tokens list in O(N)
            for(int i = 0; i < tokens.Length; i++){
                string curr = tokens[i];

                // If a new key is found, inventory it
                if(!tokenToFreqDict.ContainsKey(curr)){

                    // Set current frequency for the new key to 1
                    tokenToFreqDict.Add(curr, 1);

                    // Keep track of key lengths
                    int tokenLength = curr.Length;
                    if(!lenghtToTokenDict.ContainsKey(tokenLength)){

                        // a dictionary of lengths tying to a linked list of keys
                        lenghtToTokenDict.Add(tokenLength, new LinkedList<string>(new List<string>(){curr}));
                    }else{

                        // the key is appended to previous keys with the same lengths
                        lenghtToTokenDict[tokenLength].AddFirst(curr);
                    }

                }else{

                    // If it's a known key, just add increment its count
                    tokenToFreqDict[curr] = tokenToFreqDict[curr] + 1;
                }
            }

            // Return function execution time
            watch.Stop();
            double durationMs = watch.ElapsedMilliseconds;
            Console.WriteLine($"Inventory took: {durationMs}ms");//1.7s
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
            }catch(Exception ex){
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
            }catch(Exception ex){
                // throw ex;
                hadErrors = true;
            }

            return hadErrors;
        }
    }
}
