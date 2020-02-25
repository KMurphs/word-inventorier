using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using System.Collections;

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
            Console.WriteLine($"Request took: {(elapsedMs / 1000).ToString("F2")}secs");
            SaveBook(content);

            //string content = "sfsd sdf s sdf  sfsd";
            string[] tokens = content.Split(" ");
            Hashtable ht = new Hashtable();
            for(int i = 0; i < tokens.Length; i++)
            {
                string key = tokens[i];
                if(key == "")
                {
                    continue;
                }
                if(!ht.ContainsKey(key)){
                    ht.Add(key, 1);
                }
                else
                {
                    ht[key] = (int)ht[key] + 1;
                }
                
            }
            foreach (string key in ht.Keys)
            {
                Console.WriteLine(String.Format("{0}: {1}", key, ht[key]));
            }
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
