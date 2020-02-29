using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApp.Models;
using BookTypes;


namespace WebApp.Controllers
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
        public BookSummary GetOne(string id)
        {
            return new BookSummary(CorpusInventoryModel.GetBookByID(id));
        }



        [HttpGet]
        public List<BookSummary> Get()
        {
            // https://stackoverflow.com/questions/9478613/how-to-deserialize-a-bsondocument-object-back-to-class/9479341
            List<BookSummary> res = new List<BookSummary>();
            List<DBBookSummary> books = CorpusInventoryModel.GetBooks();
            foreach(DBBookSummary book in books){
                res.Add(new BookSummary(book));
            }
            return res;
        }


        [HttpPost()]
        public async Task<BookSummary> ProcessBook([FromBody] ApiQuery content)
        // public async Task<Object> ProcessBook([FromBody] Object content)
        {
            Console.WriteLine($"Received Query: {content}");
            Console.WriteLine($"Received Query: {content.book}");
            Console.WriteLine($"Received Query: {content.queries}");

            DBBookSummary book = null;
            book = CorpusInventoryModel.GetBookWithID(content.book);
            if(book == null){
                book = await CorpusInventoryModel.ProcessNewBook(content.book);
            }

            List<IQueryResult> results = CorpusInventoryModel.Query(content.queries, book.frequencyStructure, book.lengthsStructure);
            return new BookSummary(book.id, book.meta, book.wordsCount, book.uniqueWordsCount, book.mostFrequentWord, book.longestWord, book.leastFrequentWord, book.shortestWord, book.summaryDurationSec, results);
            // return content;
        }
    }
}
