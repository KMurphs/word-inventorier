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
            return new TextSummary(CorpusInventoryModel.GetTextByID(id));
        }



        [HttpGet]
        public List<TextSummary> Get()
        {
            // https://stackoverflow.com/questions/9478613/how-to-deserialize-a-bsondocument-object-back-to-class/9479341
            List<TextSummary> res = new List<TextSummary>();
            List<DBTextSummary> texts = CorpusInventoryModel.GetTexts();
            foreach(DBTextSummary text in texts){
                res.Add(new TextSummary(text));
            }
            return res;
        }


        [HttpPost()]
        public async Task<TextSummary> ProcessText([FromBody] ApiQuery content)
        // public async Task<Object> ProcessText([FromBody] Object content)
        {
            Console.WriteLine($"Received Query: {content}");
            Console.WriteLine($"Received Query: {content.text}");
            Console.WriteLine($"Received Query: {content.queries}");

            DBTextSummary text = null;
            text = CorpusInventoryModel.GetTextWithID(content.text);
            if(text == null){
                text = await CorpusInventoryModel.ProcessNewText(content.text);
            }

            List<IQueryResult> results = CorpusInventoryModel.Query(content.queries, text.frequencyStructure, text.lengthsStructure);
            return new TextSummary(text.id, text.meta, text.wordsCount, text.uniqueWordsCount, text.mostFrequentWord, text.longestWord, text.leastFrequentWord, text.shortestWord, text.summaryDurationSec, results);
            // return content;
        }
    }
}
