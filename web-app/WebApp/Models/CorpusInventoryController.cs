using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BookHandler;
using BookTypes;

namespace WebApp.Models
{

    public class CorpusInventoryModel
    {

        private Handler bookHandler;

        public CorpusInventoryModel()
        {
            bookHandler = new Handler();
            Console.WriteLine($"Current Book Handler Version: '{bookHandler.getVersion()}'");
        }

        public IEnumerable<BookSummary> GetBooks(){
        // public string id { get; }
        // public string idType { get; }
        // public int wordsCount { get; }
        // public int uniqueWordsCount { get; }
        // public InventoryItem mostFrequentWord { get; }
        // public InventoryItem longestWord { get; }
        // public double summaryDurationSec { get; }
        // public List<QueryResult> results {get; }
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new BookSummary(
                $"{DateTime.Now}",
                rng.Next(-20, 55),
                rng.Next(-20, 55),
                new InventoryItem("sdfs", 12),
                new InventoryItem("sdfs43", 122),
                rng.Next(-20, 55),
                new List<IQueryResult>()
            ))
            .ToArray();
        }
    }
}
