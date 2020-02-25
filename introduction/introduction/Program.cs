using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using System.Collections;
using System.Text.RegularExpressions;

namespace introduction
{
    class Program
    {
        static async Task Main(string[] args)
        {
            string url = "http://www.gutenberg.org/files/2600/2600-0.txt";

            var watch = System.Diagnostics.Stopwatch.StartNew();
            string content = await GetBook(url);
            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;
            Console.WriteLine($"Request took: {(elapsedMs / 1000).ToString("F2")}secs"); // 13secs
            SaveBook(content);

            watch = System.Diagnostics.Stopwatch.StartNew();
            //string content = "sfsd sdf s sdf  sfsd";
            content = Regex.Replace(content, @"\p{P}", "");
            content = Regex.Replace(content, @"-", "0");
            content = RemoveSpecialCharacters(content);
            string[] tokens = content.Split(" ");
            Hashtable ht = new Hashtable();
            int maxFreq = 0;
            string maxFreqKey = "";
            int maxLen = 0;
            string maxLenKey = "";
            for (int i = 0; i < tokens.Length; i++)
            {
                string key = tokens[i];
                if(key == "")
                {
                    continue;
                }
                if(!ht.ContainsKey(key)){
                    if(maxLen < key.Length)
                    {
                        maxLen = key.Length;
                        maxLenKey = key;
                    }
                    ht.Add(key, 1);
                }
                else
                {
                    int currCount = (int)ht[key] + 1;
                    ht[key] = currCount;
                    if(maxFreq < currCount)
                    {
                        maxFreq = currCount;
                        maxFreqKey = key;
                    }
                }
                
            }
            //foreach (string key in ht.Keys)
            //{
            //    Console.WriteLine(String.Format("{0}: {1}", key, ht[key]));
            //}
            watch.Stop();
            elapsedMs = watch.ElapsedMilliseconds;
            Console.WriteLine($"The book has {tokens.Length} words");//'659808'
            Console.WriteLine($"The book has {ht.Keys.Count} different entries");//'22169'
            Console.WriteLine($"The most frequent word is '{maxFreq}' with '{maxFreqKey}' entries");//'the' with '31794'
            Console.WriteLine($"The longest word is '{maxLenKey}' with '{maxLen}' characters");//'HofskriegswurstschnappsRath' with '27' characters
            Console.WriteLine($"Inventory took: {(elapsedMs / 1000).ToString("F2")}secs");//0
            Console.WriteLine($"Inventory took: {elapsedMs}ms");//1.7s
        }
        public static string RemoveSpecialCharacters(string input)
        {
            //https://stackoverflow.com/questions/4418279/regex-remove-special-characters
            //Regex r = new Regex("(?:[^a-z0-9 ]|(?<=['\"])s)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            Regex r = new Regex("(?:[^a-z0-9 ]|(?<=['\"])s)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            //return r.Replace(input, String.Empty);
            return r.Replace(input, " ");
        }
        static async Task<string> GetBook(string url)
        {
            string content = "";
            using (var client = new HttpClient())
            {
                content = await client.GetStringAsync(url);
            }
            return content;
        }

        static void SaveBook(string BookContent)
        {
            string bookDirectory = Path.GetFullPath(Directory.GetCurrentDirectory().Replace("/", "\\") + "\\" + "..\\..\\..\\..\\books");
            if (!Directory.Exists(bookDirectory))
            {
                Console.WriteLine($"Creating Book Directory at: '{bookDirectory}'");
                Directory.CreateDirectory(bookDirectory);
            }
            Console.WriteLine($"Books are stored in Directory is: '{bookDirectory}'");

            Int32 unixTimestamp = (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            System.IO.File.WriteAllText(Path.GetFullPath(bookDirectory + "\\" + $"{unixTimestamp}.book.txt"), BookContent);
        }
    }
}
