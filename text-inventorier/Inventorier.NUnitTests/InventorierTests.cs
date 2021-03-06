using System;
using NUnit.Framework;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using WordInventoryApp;
using System.Linq;


namespace WordInventoryApp.NUnitTests
{
    public class InventorierTests
    {

        private WordInventorier wordInventorier;

        [SetUp]
        public void Setup()
        {
            wordInventorier = new WordInventorier();
        }














        [Test]
        [TestCaseSource(nameof(CanTransformSanitizedStringIntoDataStructure_DataSource))]
        public void CanTransformSanitizedStringIntoDataStructure(string strInput, IDictionary<string, int> freqDict, IDictionary<int, LinkedList<string>> lengthsDict, string mostFreq, string longest , string leastFreq, string shortest )
        {         

            IDictionary<string, int> freqs;
            IDictionary<int, LinkedList<string>> lengths;
            IInventoryItem mostFrequentToken;
            IInventoryItem longestToken;
            IInventoryItem leastFrequentToken;
            IInventoryItem shortestToken;
            int tokensCount;
            double durationMs = wordInventorier.Process(strInput, out freqs, out lengths, out mostFrequentToken, out longestToken, out leastFrequentToken, out shortestToken, out tokensCount);

            foreach(string key in freqs.Keys){
                Console.WriteLine($"{key} -> {freqs[key]}");
            }
            foreach(int key in lengths.Keys){
                Console.WriteLine($"{key} -> {string.Join( ", ", new List<string>(lengths[key]).ToArray() )}");//1.7s
            }

            if(strInput != "" && strInput != null){
                Assert.True(tokensCount == Regex.Matches(strInput, " ").Count + 1, "Returns correct meta data");
                Assert.True(mostFrequentToken.key == mostFreq, "Returns correct meta data");
                Assert.True(mostFrequentToken.length == mostFreq.Length, "Returns correct meta data");
                Assert.True(mostFrequentToken.frequency == Regex.Matches(strInput, mostFreq).Count, "Returns correct meta data");
                Assert.True(longestToken.key == longest, "Returns correct meta data");
                Assert.True(longestToken.length == longest.Length, "Returns correct meta data");
                Assert.True(longestToken.frequency == Regex.Matches(strInput, longest).Count, "Returns correct meta data");
            } else{
                Assert.True(tokensCount == 0, "Returns correct meta data");
                Assert.True(mostFrequentToken.key == mostFreq, "Returns correct meta data");
                Assert.True(mostFrequentToken.length == mostFreq.Length, "Returns correct meta data");
                Assert.True(mostFrequentToken.frequency == 0, "Returns correct meta data");
                Assert.True(longestToken.key == longest, "Returns correct meta data");
                Assert.True(longestToken.length == longest.Length, "Returns correct meta data");
                Assert.True(longestToken.frequency == 0, "Returns correct meta data");
            }




            Assert.False(freqs.ContainsKey(""), "No key in frequency dictionary can be empty");
            Assert.False(lengths.ContainsKey(0), "No key in length dictionary can be 0");
            Console.WriteLine($"Inventory took: {durationMs}ms");//1.7s
            // Console.WriteLine(lengthsDict.Keys.ToList().ToString());//1.7s
            if(strInput != ""  && strInput != null){
                foreach(string key in freqDict.Keys){
                    Assert.True(freqs[key] == freqDict[key], "Returns correct frequencies");
                }
                foreach(int key in lengthsDict.Keys){
                    Assert.True(lengths[key].Count == lengthsDict[key].Count, "Returns correct number of bucket element for a count of key lengths");
                    Assert.True(lengths[key].Find(lengthsDict[key].First.Value).Value ==  lengthsDict[key].First.Value, "Returns correct number of bucket element for a count of key lengths");
                    
                    var currentNode = lengthsDict[key].First;
                    while ((currentNode != null)){
                        Assert.True(lengths[key].Contains(currentNode.Value), "Can find each one of key at the correct count");
                        currentNode = currentNode.Next;
                    }    
                }
            } else {
                foreach(string key in freqDict.Keys){
                    Assert.False(freqs.ContainsKey(key), "Returns correct frequencies");
                }
                // foreach(int key in lengthsDict.Keys){
                //     Assert.True(lengths[key].Count == lengthsDict[key].Count, "Returns correct number of bucket element for a count of key lengths");
                //     Assert.True(lengths[key].Find(lengthsDict[key].First.Value).Value ==  lengthsDict[key].First.Value, "Returns correct number of bucket element for a count of key lengths");
                    
                //     var currentNode = lengthsDict[key].First;
                //     while ((currentNode != null)){
                //         Assert.True(lengths[key].Contains(currentNode.Value), "Can find each one of key at the correct count");
                //         currentNode = currentNode.Next;
                //     }    
                // }
            }

        }
        static IEnumerable<object[]> CanTransformSanitizedStringIntoDataStructure_DataSource()
        {
            return new[] { 
                new object[] {"", new Dictionary<string, int>(){{"", 0}}, new Dictionary<int, LinkedList<string>>(){{0,new LinkedList<string>(new List<string>(){""})}}, "", "", "", ""},
                new object[] {null, new Dictionary<string, int>(){{"", 0}}, new Dictionary<int, LinkedList<string>>(){{0,new LinkedList<string>(new List<string>(){""})}}, "", "", "", ""},
                new object[] {"test tmp test tmp test", new Dictionary<string, int>(){{"test", 3},{"tmp",2}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"test"})},{3,new LinkedList<string>(new List<string>(){"tmp"})}}, "test", "test", "tmp", "tmp"},
                new object[] {"test tmp test tmp test", new Dictionary<string, int>(){{"test", 3},{"tmp",2}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"test"})},{3,new LinkedList<string>(new List<string>(){"tmp"})}}, "test", "test", "tmp", "tmp"},
                new object[] {"test tmp test tmp test tmp1 tmp1", new Dictionary<string, int>(){{"test", 3},{"tmp",2},{"tmp1",2}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"test","tmp1"})},{3,new LinkedList<string>(new List<string>(){"tmp"})}}, "test", "test", "tmp", "tmp"},
            };
        }














        [Test]
        [TestCaseSource(nameof(CanSerializeAndDeserializeDataStrtucture_DataSource))]
        public void CanSerializeAndDeserializeDataStrtucture(IDictionary<string, int> freqDict, IDictionary<int, LinkedList<string>> lengthsDict)
        {     
            IDictionary<string, int> freqs = new Dictionary<string, int>();
            IDictionary<int, LinkedList<string>> lengths = new Dictionary<int, LinkedList<string>>();

            string strFreqs = "";
            string strLengths = "";
            wordInventorier.Serialize(freqDict, lengthsDict, out strFreqs, out strLengths);

            Assert.False(strFreqs.Equals(""), "");
            Assert.False(strLengths.Equals(""), "");
            Console.WriteLine(strFreqs);
            Console.WriteLine(strLengths);


            freqs = new Dictionary<string, int>();
            lengths = new Dictionary<int, LinkedList<string>>();
            wordInventorier.Deserialize(strFreqs, strLengths, out freqs, out lengths);



            foreach(string key in freqDict.Keys){
                Assert.True(freqs[key] == freqDict[key], "Returns correct frequencies after serialization and deserialization...");
            }
            foreach(int key in lengthsDict.Keys){
                Assert.True(lengths[key].Count == lengthsDict[key].Count, "Returns correct number of bucket element for a count of key lengths");
                Assert.True(lengths[key].Find(lengthsDict[key].First.Value).Value ==  lengthsDict[key].First.Value, "Returns correct number of bucket element for a count of key lengths");
                
                var currentNode = lengthsDict[key].First;
                while ((currentNode != null)){
                    Assert.True(lengths[key].Contains(currentNode.Value), "Can find each one of key at the correct count after serialization and deserialization");
                    currentNode = currentNode.Next;
                }
                    
            }

            // Assert.True(false, "");
        }
        static IEnumerable<object[]> CanSerializeAndDeserializeDataStrtucture_DataSource()
        {
            return new[] { 
                new object[] {new Dictionary<string, int>(){{"test1", 151},{"test2",152}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"4568","1238"})},{3,new LinkedList<string>(new List<string>(){"456","123"})}}},
                new object[] {new Dictionary<string, int>(){{"test1", 151},{"test2",152}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"4568","1238","tnp"})},{3,new LinkedList<string>(new List<string>(){"456","123"})}}},
                
            };
        }
















        [Test]
        [TestCaseSource(nameof(CanPerformQuery_DataSource))]
        public void CanPerformQuery(IDictionary<string, int> freqDict, IDictionary<int, LinkedList<string>> lengthsDict, List<string> keysInOrder)
        {     
            List<IInventoryItem> results;

            double durationMs = wordInventorier.Query(freqDict, lengthsDict, 3, 10, 50, out results);
            Console.WriteLine($"Query took: {durationMs}ms");//1.7s
            foreach(InventoryItem item in results){
                Console.WriteLine(item.ToString());
            }

            Console.WriteLine(results.Count);
            Console.WriteLine(keysInOrder);
            Assert.True(results.Count == keysInOrder.Count, "Query Performs Accurately");
            for(int i = 0; i < keysInOrder.Count; i++){
                Assert.True(results[i].key == keysInOrder[i], "Query Performs Accurately");
                Assert.True(results[i].frequency == freqDict[keysInOrder[i]], "Query Performs Accurately");
                Assert.True(results[i].length == keysInOrder[i].Length, "Query Performs Accurately");
            }


            // Assert.True(false, "");

        }
        static IEnumerable<object[]> CanPerformQuery_DataSource()
        {
            return new[] { 
                new object[] {new Dictionary<string, int>(){{"testb", 152},{"testa",152}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"testa","testb"})}}, new List<string>{"testa", "testb"}},
                new object[] {new Dictionary<string, int>(){{"test1", 151},{"test2",152}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"test1","test2"})}}, new List<string>{"test2", "test1"}},
                new object[] {new Dictionary<string, int>(){{"te", 151},{"test2",152}}, new Dictionary<int, LinkedList<string>>(){{2,new LinkedList<string>(new List<string>(){"te"})},{4,new LinkedList<string>(new List<string>(){"test2"})}}, new List<string>{"test2"}},
                new object[] {new Dictionary<string, int>(){{"te", 151},{"test2",152}}, new Dictionary<int, LinkedList<string>>(){{2,new LinkedList<string>(new List<string>(){"te"})},{4,new LinkedList<string>(new List<string>(){"test2"})}}, new List<string>{"test2"}},
                new object[] {new Dictionary<string, int>(){{"test2",152}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"test2"})}}, new List<string>{"test2"}},
                new object[] {new Dictionary<string, int>(){{"", 0}}, new Dictionary<int, LinkedList<string>>(){{0,new LinkedList<string>(new List<string>(){""})}}, new List<string>{}},
            };
        }



    }
}