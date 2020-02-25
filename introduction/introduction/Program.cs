using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace introduction
{
    class Program
    {
        static async Task Main(string[] args)
        {
            string url = "http://www.gutenberg.org/files/2600/2600-0.txt";
            var watch = System.Diagnostics.Stopwatch.StartNew();
            using (var client = new HttpClient())
            {
                var content = await client.GetStringAsync(url);
                //Console.WriteLine(content);
            }
            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;
            Console.WriteLine($"Request took: {(elapsedMs/1000).ToString("F2")}secs");
        }
    }
}
