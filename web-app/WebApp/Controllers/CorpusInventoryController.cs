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
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<CorpusInventoryController> _logger;
        private readonly CorpusInventoryModel corpusModel;

        public CorpusInventoryController(ILogger<CorpusInventoryController> logger)
        {
            _logger = logger;
            corpusModel = new CorpusInventoryModel();
        }


        [HttpGet]
        [Route("api/[controller]/test")]
        public IEnumerable<BookSummary> GetOne()
        {
            return corpusModel.GetBooks();
        }



        [HttpGet]
        public IEnumerable<BookSummary> Get()
        {
            return corpusModel.GetBooks();
        }
    }
}
