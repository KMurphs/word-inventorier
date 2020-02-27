using System;
using System.Collections.Generic;
using BookTypes;

namespace WebApp
{
    public struct ApiQuery
    {
        public string book { get; set; }

        public List<Query> queries { get; set; }
    }

}
