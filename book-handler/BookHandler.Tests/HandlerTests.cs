using NUnit.Framework;
using BookHandler;
using BookTypes;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace BookHandler.Tests
{
    public class HandlerTests
    {
        private Handler bookHandler;

        [SetUp]
        public void Setup()
        {
            bookHandler = new Handler();
        }

        [Test]
        [TestCaseSource(nameof(CanHandleANewBookFromRetrievalUntilQueryResult_DataSource))]
        public async Task CanHandleANewBookFromRetrievalUntilQueryResult(string inputStr, string bookId, string mostFreq, string bookType)
        {

            // bookHandler.Handle(inputStr, topN_inFreq = 50, topN_inFreqLongerthan_L = 50, Length_L = 6);
            List<Query> queries = new List<Query>();
            queries.Add(new Query(5, 0, 100));
            queries.Add(new Query(5, 4, 100));
            BookSummaryAndStructures res = await bookHandler.Handle(inputStr);
            Console.WriteLine(res.summary.idType);
            Console.WriteLine(bookType);
            
            

            Assert.True(res.summary.id == bookId, "HTTP Get Request can be made, and the response is a book");
            Assert.True(res.summary.idType == bookType, "HTTP Get Request can be made, and the response is a book");
            Assert.True(res.summary.mostFrequentWord.key == mostFreq, "HTTP Get Request can be made, and the response is a book");
            // Assert.True(false, "HTTP Get Request can be made, and the response is a book");

            Assert.That(async () => {return 1;}, Is.EqualTo(1).After(100));
        }
        static IEnumerable<object[]> CanHandleANewBookFromRetrievalUntilQueryResult_DataSource()
        {
            return new[] { 
                new object[] {"test tmp test tmp test", "B683CA19173F4904E3A2DA8AAB10E1690113F4E76813D0546CAEC7EE792B7DCD", "test", "book-hash"},
                new object[] {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "2D8C2F6D978CA21712B5F6DE36C9D31FA8E96A4FA5D8FF8B0188DFB9E7C171BB", "in", "book-hash"},
                new object[] {"http://www.gutenberg.org/files/2600/2600-0.txt", "8223D47B279875728F57C5E7451F1D433EBAAD14F011DC487648227295AA4D3D", "the", "book-url"},
            };
        }
    }
}

