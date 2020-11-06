using System;
using System.Collections.Generic;
using WordInventoryApp;

namespace WordInventoryApp.WebApp
{
    public struct ApiQuery
    {
        public string book { get; set; }

        public List<Query> queries { get; set; }
    }

}
