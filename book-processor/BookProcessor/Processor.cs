using System;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Threading.Tasks;



namespace BookProcessor
{
    public class Processor
    {
        public string Sanitize(string inStr){
            Regex r = new Regex("[^a-z0-9- ]", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            string sanitizedStr = r.Replace(inStr, "");
            return sanitizedStr;
        }
        public async Task<string> FetchCorpus(string url, Boolean sanitizeBook = true)
        {
            string content = "";
            using (var client = new HttpClient())
            {
                content = await client.GetStringAsync(url);
            }
            return sanitizeBook ? Sanitize(content) : content;
        }

    }
}
