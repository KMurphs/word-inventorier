using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

        public CorpusInventoryController(ILogger<CorpusInventoryController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<CorpusInventory> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new CorpusInventory
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
