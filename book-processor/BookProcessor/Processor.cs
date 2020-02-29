using System;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Threading.Tasks;



namespace BookProcessor
{
    public class Processor
    {
        public string Sanitize(string inStr){
            if(inStr == null){
                return "";
            }
            Regex r = new Regex("[^a-z0-9- ]", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            string sanitizedStr = r.Replace(inStr, " ");

            r = new Regex("[  ]+", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            sanitizedStr = r.Replace(sanitizedStr, " ");

            return sanitizedStr.ToLower();
        }
        public async Task<string> FetchCorpus(string _url, Boolean sanitizeBook = true)
        {
            string url = _url.Split(" ".ToCharArray())[0];
            if(url == null || url == "" || url.IndexOf("http") == -1){
                return "";
            }
            string content = "";
            using (var client = new HttpClient())
            {
                content = await client.GetStringAsync(url);
            }
            return sanitizeBook ? Sanitize(content) : content;
        }

    }
}
