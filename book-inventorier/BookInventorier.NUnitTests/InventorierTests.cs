using System;
using NUnit.Framework;
using System.Collections.Generic;
// using System.Web.Script.Serialization;
// using Newtonsoft.Json;
// using Newtonsoft.Json.Linq;
// using Java.Util;

namespace BookInventorier.NUnitTests
{
    public class Tests
    {
        private Inventorier bookInventorier;

        [SetUp]
        public void Setup()
        {
            bookInventorier = new Inventorier();
        }


        [Test]
        [TestCaseSource(nameof(CanTransformSanitizedStringIntoDataStructure_DataSource))]
        public void CanTransformSanitizedStringIntoDataStructure(string strInput, IDictionary<string, int> freqDict, IDictionary<int, LinkedList<string>> lengthsDict)
        {         

            IDictionary<string, int> freqs;
            IDictionary<int, LinkedList<string>> lengths;
            double durationMs = bookInventorier.Process(strInput, out freqs, out lengths);

            foreach(string key in freqs.Keys){
                Console.WriteLine($"{key} -> {freqs[key]}");
            }
            foreach(int key in lengths.Keys){
                Console.WriteLine($"{key} -> {string.Join( ", ", new List<string>(lengths[key]).ToArray() )}");//1.7s
            }



            Console.WriteLine($"Inventory took: {durationMs}ms");//1.7s
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


        }
        static IEnumerable<object[]> CanTransformSanitizedStringIntoDataStructure_DataSource()
        {
            return new[] { 
                new object[] {"test tmp test tmp test", new Dictionary<string, int>(){{"test", 3},{"tmp",2}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"test"})},{3,new LinkedList<string>(new List<string>(){"tmp"})}}},
                new object[] {"test tmp test tmp test tmp1 tmp1", new Dictionary<string, int>(){{"test", 3},{"tmp",2},{"tmp1",2}}, new Dictionary<int, LinkedList<string>>(){{4,new LinkedList<string>(new List<string>(){"test","tmp1"})},{3,new LinkedList<string>(new List<string>(){"tmp"})}}},
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
            bookInventorier.Serialize(freqDict, lengthsDict, out strFreqs, out strLengths);

            Assert.False(strFreqs.Equals(""), "");
            Assert.False(strLengths.Equals(""), "");
            Console.WriteLine(strFreqs);
            Console.WriteLine(strLengths);


            freqs = new Dictionary<string, int>();
            lengths = new Dictionary<int, LinkedList<string>>();
            bookInventorier.Deserialize(strFreqs, strLengths, out freqs, out lengths);


            foreach(string key in freqDict.Keys){
                Assert.True(freqs[key] == freqDict[key], "Returns correct frequencies after serialization and deserialization");
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

    }
}