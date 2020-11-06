using System;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Threading.Tasks;



namespace BookProcessor
{


    /// <summary>
    /// Collection of utilities used to process text so it is ready for the inventory algorithm
    /// </summary>
    public class Processor
    {




        /// <summary>
        /// This method will ensure that the text only contains words in lower case and spaces to separate them.
        /// All characters not part of words are removed. 
        /// </summary>
        /// <param name="inStr">The string to be sanitized</param>
        /// <returns>The sanitized input string</returns>
        public string Sanitize(string inStr){

            // There is nothing to do
            if(inStr == null){
                return "";
            }

            // Regular expression for anything that is not a character that forms a word
            // Replace everything that is not part of a word by an empty space
            Regex r = new Regex("[^a-z0-9- ]", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            string sanitizedStr = r.Replace(inStr, " ");

            // Regular expression for consecutive spaces
            // Replace consecutive spaces with one empty space
            r = new Regex("[  ]+", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            sanitizedStr = r.Replace(sanitizedStr, " ");
            
            // Ensure that the text is completely in lower case, to prevent the same word to exists at two different entries because of case
            return sanitizedStr.ToLower();
        }




        /// <summary>
        /// This method will make a http request to obtain the content of the document at the url provided
        /// Optionally, the method can pre-process (sanitize) the text received as response
        /// </summary>
        /// <param name="_url">URL to the document that must be fetched</param>
        /// <param name="sanitizeBook">Boolean to optionally pre-process the received text</param>
        /// <returns>An awaitable object that eventually resolves into the string fetched at the input url</returns>
        public async Task<string> FetchCorpus(string _url, Boolean sanitizeBook = true)
        {   
            //Preliminary checks to ensure the url provided is valid
            string url = _url.Split(" ".ToCharArray())[0];
            if(url == null || url == "" || url.IndexOf("http") == -1){
                return "";
            }

            // Make the http request
            string content = "";
            using (var client = new HttpClient()){
                content = await client.GetStringAsync(url);
            }

            // Return the text or the sanitized/pre-processed text
            return sanitizeBook ? Sanitize(content) : content;
        }

    }
}
