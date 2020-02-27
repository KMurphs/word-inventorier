using NUnit.Framework;
using BookHandler;
using BookTypes;
using System.Collections.Generic;


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
        public void CanHandleANewBookFromRetrievalUntilQueryResult()
        {

            Assert.Pass();
        }
    }
}