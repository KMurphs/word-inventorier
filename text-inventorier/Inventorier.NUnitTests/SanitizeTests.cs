using NUnit.Framework;
using System.Collections.Generic;
using System;
using WordInventoryApp;
// using Xunit;

namespace WordInventoryApp.NUnitTests
{
    public class SanitizeTests
    {
        private readonly TextPreprocessor textPreprocessor;
        public SanitizeTests()
        {
            textPreprocessor = new TextPreprocessor();
        }
        [Test]
        [TestCaseSource(nameof(CanRemoveSpecialCharacters_DataSource))]
        public void CanRemoveSpecialCharacters(string inVal, string exp)
        {

            string res = textPreprocessor.Sanitize(inVal);
            Console.WriteLine(inVal);
            Console.WriteLine(res);
            Console.WriteLine(res.Length);
            Console.WriteLine(exp.ToLower());
            Console.WriteLine(exp.ToLower().Length);
            Console.WriteLine(res.Equals(exp.ToLower()));
            Assert.True(res.Equals(exp.ToLower()), "Sanitize Function will remove all special character from its input argument");
        }

        static IEnumerable<object[]> CanRemoveSpecialCharacters_DataSource()
        {
            return new[] { 
                new object[] {"", ""},
                new object[] {"test", "test"},
                new object[] {" tEst tesT1 ", " test test1 "},
                new object[] {" ", " "},
                new object[] {"  ", " "},
                new object[] {"          ", " "},
                new object[] {null, ""},
                new object[] {"test and some more test", "test and some more test"},
                new object[] {"test 012 som3e more test", "test 012 som3e more test"},
                new object[] {"test 012 so-m3e more t-es-t", "test 012 so-m3e more t-es-t"},
                new object[] {"Hello, Hi!! Guardians of the Galaxy...", "Hello Hi Guardians of the Galaxy "},
                new object[] {"W!h@e#r$e i%s m^y u&m*b(r)e+l=l/a?", "W h e r e i s m y u m b r e l l a "},
                new object[] {"W{h}e::r'e i\"s m/y u>m<b,r.e~`lla", "W h e r e i s m y u m b r e lla"},
            };
        }
    }

}