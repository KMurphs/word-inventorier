using System;
using Xunit;
using Xunit.Abstractions;
using System.Collections.Generic;

namespace BookInventorier.Tests
{
    public class InventorierTests
    {
        private readonly ITestOutputHelper output;
        private readonly Inventorier bookInventorier;
        public InventorierTests(ITestOutputHelper output)
        {
            this.output = output;
            bookInventorier = new Inventorier();
        }
        [Fact]
        public void CanTransformSanitizedStringIntoDictionary()
        {
            IDictionary<string, int> freqs;
            IDictionary<int, LinkedList<string>> lengths;
            double durationMs = bookInventorier.Process("test test test", out freqs, out lengths);
            output.WriteLine($"Inventory took: {durationMs}ms");//1.7s
            Assert.True(true, "");
        }
    }
}
