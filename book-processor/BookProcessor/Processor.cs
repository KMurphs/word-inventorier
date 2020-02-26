using System;
using System.Text.RegularExpressions;

namespace BookProcessor
{
    public class Processor
    {
        public string Sanitize(string inStr){
            Regex r = new Regex("[^a-z0-9- ]", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
            return r.Replace(inStr, "");
        }
    }
}
