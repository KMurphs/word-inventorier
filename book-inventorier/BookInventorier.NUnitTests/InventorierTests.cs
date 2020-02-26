using System;
using NUnit.Framework;
using System.Collections.Generic;
// using System.Web.Script.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public void CanTransformSanitizedStringIntoDataStructure()
        {         

            IDictionary<string, int> freqs;
            IDictionary<int, LinkedList<string>> lengths;
            double durationMs = bookInventorier.Process("test tmp test tmp test", out freqs, out lengths);

            foreach(string key in freqs.Keys){
                Console.WriteLine($"{key} -> {freqs[key]}");
            }
            foreach(int key in lengths.Keys){
                Console.WriteLine($"{key} -> {string.Join( ", ", new List<string>(lengths[key]).ToArray() )}");//1.7s
            }

            // var json = new JavaScriptSerializer().Serialize(obj);
            // Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, int>>(freqs);
            // string output = JsonConvert.SerializeObject(freqs);
            // Console.WriteLine(output);
            // IDictionary<string, int> newFreqs = JsonConvert.DeserializeObject<IDictionary<string, int>>(output);




            Console.WriteLine($"Inventory took: {durationMs}ms");//1.7s
            Assert.True(freqs["test"] == 3, "");
            Assert.True(freqs["tmp"] == 2, "");
            Assert.True(lengths[3].First.Value == "tmp", "");
            Assert.True(lengths[4].First.Value == "test", "");
            // Assert.True(durationMs > 0, "");
            // Assert.True(durationMs < 0, "");


        }


        [Test]
        public void CanSerializeAndDeserializeDataStrtucture()
        {     
            IDictionary<string, int> freqs = new Dictionary<string, int>();
            IDictionary<int, LinkedList<string>> lengths = new Dictionary<int, LinkedList<string>>();


            freqs.Add("test1", 151);
            freqs.Add("test2", 152);

            LinkedList<string> l = new LinkedList<string>();
            l.AddFirst("456");
            l.AddFirst("123");
            lengths.Add(3, l);

            l = new LinkedList<string>();
            l.AddFirst("4568");
            l.AddFirst("1238");
            lengths.Add(4, l);

            string strFreqs = "";
            string strLengths = "";
            bookInventorier.Serialize(freqs, lengths, out strFreqs, out strLengths);

            Assert.False(strFreqs.Equals(""), "");
            Assert.False(strLengths.Equals(""), "");
            Console.WriteLine(strFreqs);
            Console.WriteLine(strLengths);


            freqs = new Dictionary<string, int>();
            lengths = new Dictionary<int, LinkedList<string>>();
            bookInventorier.Deserialize(strFreqs, strLengths, out freqs, out lengths);
            Assert.True(freqs.Keys.Contains("test1"), "");
            Assert.True(freqs.Keys.Contains("test2"), "");
            Assert.True(freqs["test1"] == 151, "");
            Assert.True(freqs["test2"] == 152, "");

            Assert.True(lengths.Keys.Contains(3), "");
            Assert.True(lengths.Keys.Contains(4), "");
            Assert.True(lengths[3].First.Value == "123", "");
            Assert.True(lengths[3].First.Next.Value == "456", "");
            Assert.True(lengths[3].Count == 2, "");
            Assert.True(lengths[4].First.Value == "1238", "");
            Assert.True(lengths[4].First.Next.Value == "4568", "");
            Assert.True(lengths[4].Count == 2, "");

            // Assert.True(false, "");
        }


    }
}