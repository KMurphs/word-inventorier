using System;
using Xunit;
using BookProcessor;

namespace BookProcessor.Tests
{
    public class SanitizeTests
    {
        private readonly Processor bookProcessor;
        public SanitizeTests()
        {
            bookProcessor = new Processor();
        }
        [Theory]
        [InlineData("", "")]
        [InlineData("test", "test")]
        [InlineData("test and some more test", "test and some more test")]
        [InlineData("test 012 som3e more test", "test 012 som3e more test")]
        [InlineData("test 012 so-m3e more t-es-t", "test 012 so-m3e more t-es-t")]
        [InlineData("Hello, Hi!! Guardians of the Galaxy...", "Hello Hi Guardians of the Galaxy")]
        [InlineData("W!h@e#r$e i%s m^y u&m*b(r)e+l=l/a?", "Where is my umbrella")]
        [InlineData("W{h}e::r'e i\"s m/y u>m<b,r.e~`lla", "Where is my umbrella")]
        public void Test1(string inVal, string exp)
        {
            string res = bookProcessor.Sanitize(inVal);
            Assert.True(res.Equals(exp), "Empty string returns Empty");
        }
    }
}
