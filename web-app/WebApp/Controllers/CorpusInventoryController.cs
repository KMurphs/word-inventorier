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
        private readonly CorpusInventoryModel corpusModel;

        public CorpusInventoryController(ILogger<CorpusInventoryController> logger)
        {
            _logger = logger;
            corpusModel = new CorpusInventoryModel();
        }

        // https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-3.1
        // https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-3.1&tabs=visual-studio
        [HttpGet("{id}")]
        public BookSummary GetOne(string id)
        {
            return new BookSummary(corpusModel.GetBookByID(id));
        }



        [HttpGet]
        public List<BookSummary> Get()
        {
            // https://stackoverflow.com/questions/9478613/how-to-deserialize-a-bsondocument-object-back-to-class/9479341
            List<BookSummary> res = new List<BookSummary>();
            List<DBBookSummary> books = corpusModel.GetBooks();
            foreach(DBBookSummary book in books){
                res.Add(new BookSummary(book));
            }
            return res;
        }


        [HttpPost()]
        public async Task<BookSummary> ProcessBook([FromBody] ApiQuery content)
        {
            Console.WriteLine(content);

            DBBookSummary book = null;
            //book = corpusModel.GetBookWithID(content.book);
            if(book == null){
                book = await corpusModel.ProcessNewBook(content.book);
            }

            List<IQueryResult> results = corpusModel.Query(content.queries, book.frequencyStructure, book.lengthsStructure);
            return new BookSummary(book.id, book.meta, book.wordsCount, book.uniqueWordsCount, book.mostFrequentWord, book.longestWord, book.summaryDurationSec, results);
        }
    }
}
