using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WordInventoryApp.WebApp.Models;
using WordInventoryApp;


namespace WordInventoryApp.WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CorpusInventoryController : ControllerBase
    {


        private readonly ILogger<CorpusInventoryController> _logger;

        // private static readonly CorpusInventoryModel;

        public CorpusInventoryController(ILogger<CorpusInventoryController> logger)
        {
            _logger = logger;
            // corpusModel = new CorpusInventoryModel();
            Console.WriteLine($"Corpus Model is Initialized: {CorpusInventoryModel.isInitialized}");
            CorpusInventoryModel.initCorpusInventoryModel();
        }

        // https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-3.1
        // https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-3.1&tabs=visual-studio
        [HttpGet("{id}")]
        public TextSummary GetOne(string id)
        {
            return new TextSummary(CorpusInventoryModel.GetBookByID(id));
        }



        [HttpGet]
        public List<TextSummary> Get()
        {
            // https://stackoverflow.com/questions/9478613/how-to-deserialize-a-bsondocument-object-back-to-class/9479341
            List<TextSummary> res = new List<TextSummary>();
            List<DBTextSummary> books = CorpusInventoryModel.GetBooks();
            foreach(DBTextSummary book in books){
                res.Add(new TextSummary(book));
            }
            return res;
        }


        [HttpPost()]
        public async Task<TextSummary> ProcessBook([FromBody] ApiQuery content)
        // public async Task<Object> ProcessBook([FromBody] Object content)
        {
            Console.WriteLine($"Received Query: {content}");
            Console.WriteLine($"Received Query: {content.book}");
            Console.WriteLine($"Received Query: {content.queries}");

            DBTextSummary book = null;
            book = CorpusInventoryModel.GetBookWithID(content.book);
            if(book == null){
                book = await CorpusInventoryModel.ProcessNewBook(content.book);
            }

            List<IQueryResult> results = CorpusInventoryModel.Query(content.queries, book.frequencyStructure, book.lengthsStructure);
            return new TextSummary(book.id, book.meta, book.wordsCount, book.uniqueWordsCount, book.mostFrequentWord, book.longestWord, book.leastFrequentWord, book.shortestWord, book.summaryDurationSec, results);
            // return content;
        }
    }
}
