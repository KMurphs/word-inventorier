using System;
using Xunit;
using BookProcessor;


namespace BookProcessor.Tests
{

    public class RetrievalTests
    {
        private readonly Processor bookProcessor;
        public RetrievalTests()
        {
            bookProcessor = new Processor();
        }
        [Theory]
        [InlineData("http://www.gutenberg.org/files/2600/2600-0.txt", false, "By Leo Tolstoy/Tolstoi")]
        [InlineData("http://www.gutenberg.org/files/2600/2600-0.txt", true, "By Leo Tolstoy Tolstoi")]
        public async void CanFetchABook(string url, Boolean sanitizeBook, string exp)
        {
            string content = await bookProcessor.FetchCorpus(url, sanitizeBook);
            Assert.True(content.Contains(exp), "HTTP Get Request can be made, and the response is a book");
        }

    }
}
