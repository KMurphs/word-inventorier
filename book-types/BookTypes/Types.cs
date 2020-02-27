using System;
using System.Collections.Generic;

namespace BookTypes
{


    public interface IInventoryItem{

        string key { get; }
        int frequency { get; }
        int length { get; }

    }
    public struct InventoryItem : IInventoryItem{
        public InventoryItem(string _key, int _frequency){
            key = _key;
            frequency = _frequency;
            length = _key.Length;
        }
        public string key { get; }
        public int frequency { get; }
        public int length { get; }
        public string ToString(Boolean addNewLine = false) => $"Record entry is for token '{key}' \t Occurs '{frequency}' times in corpus \t Token has {length}characters {(addNewLine?Environment.NewLine:"")}";
    }









    public interface IQueryResult{

        double durationMs { get; }
        List<InventoryItem> data { get; }
    }
    public struct QueryResult : IQueryResult{
        public QueryResult(double _durationMs, List<InventoryItem> _data){
            this.durationMs = _durationMs;
            this.data = _data;
        }
        public QueryResult(double _durationMs, List<IInventoryItem> _data){
            this.durationMs = _durationMs;
            this.data = new List<InventoryItem>();
            foreach(IInventoryItem item in _data){
                this.data.Add((InventoryItem)item);
            }
        }
        public double durationMs { get; }
        public List<InventoryItem> data { get; }

        public override string ToString() {
            string resAggregation = "";
            foreach(InventoryItem res in this.data){
                resAggregation = resAggregation + res.ToString(true);
            }
            return $@"
                \n\nQueries Records ({this.durationMs})ms: \n{resAggregation}
            ";
        } 
    }












    public struct BookSummary{
        public BookSummary(string _id, int _wordsCount, int _uniqueWordsCount, IInventoryItem _mostFrequentWord, IInventoryItem _longestWord, double _summaryDurationSec, List<IQueryResult> _results)
        {
            id = _id;
            idType = _id.IndexOf("http") == -1 ? "book-hash" : "book-url";
            wordsCount  = _wordsCount;
            uniqueWordsCount  = _uniqueWordsCount;
            mostFrequentWord  = _mostFrequentWord;
            longestWord  = _longestWord;
            summaryDurationSec  = _summaryDurationSec;
            results = _results;
        }

        public string id { get; }
        public string idType { get; }
        public int wordsCount { get; }
        public int uniqueWordsCount { get; }
        public IInventoryItem mostFrequentWord { get; }
        public IInventoryItem longestWord { get; }
        public double summaryDurationSec { get; }
        public List<IQueryResult> results {get; }

        public override string ToString() {
            return $@"
                \nThe book has id: '{id}' (idType) with '{wordsCount}' entries and '{uniqueWordsCount}' different ones.
                \nThe book was processed in '{summaryDurationSec}' seconds
                \nMost Frequent Record: {mostFrequentWord.ToString()}
                \nLongest Record: {longestWord.ToString()}
                \nQueries Records: \n{results.ToString()}
            ";
        } 

    } 
}
