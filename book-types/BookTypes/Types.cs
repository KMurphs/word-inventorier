using System;
using System.Collections.Generic;

namespace BookTypes
{

    public struct Query{

        public Query(int _topN, int _minLength, int _maxLength){
            this.topN = _topN;
            this.minLength = _minLength;
            this.maxLength = _maxLength;
        }
        public int topN { get; }
        public int minLength { get; }
        public int maxLength { get; }

    }  


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
        public string ToString(Boolean addNewLine = false) => $"Record entry is for token '{key}' - Occurs '{frequency}' times in corpus - Token has '{length}' characters {(addNewLine?Environment.NewLine:"")}";
    }









    public interface IQueryResult{
        double minTokenLength { get; }
        double maxTokenLength { get; }
        double topNCount { get; }
        double durationMs { get; }
        List<InventoryItem> data { get; }
    }
    public struct QueryResult : IQueryResult{
        public QueryResult(double _durationMs, List<InventoryItem> _data, int _minTokenLength, int _maxTokenLength, int _topNCount){
            this.durationMs = _durationMs;
            this.minTokenLength = _minTokenLength;
            this.maxTokenLength = _maxTokenLength;
            this.topNCount = _topNCount;
            this.data = _data;
        }
        public QueryResult(double _durationMs, List<IInventoryItem> _data, int _minTokenLength, int _maxTokenLength, int _topNCount){
            this.durationMs = _durationMs;
            this.data = new List<InventoryItem>();
            this.minTokenLength = _minTokenLength;
            this.maxTokenLength = _maxTokenLength;
            this.topNCount = _topNCount;
            foreach(IInventoryItem item in _data){
                this.data.Add((InventoryItem)item);
            }
        }
        public double durationMs { get; }
        public double minTokenLength { get; }
        public double maxTokenLength { get; }
        public double topNCount { get; }
        public List<InventoryItem> data { get; }

        public override string ToString() {
            string resAggregation = Environment.NewLine;
            foreach(InventoryItem res in this.data){
                resAggregation = resAggregation + "\t\t\t\t" + res.ToString(true);
            }
            return $@"

                Query Record ({this.durationMs}ms) for top '{this.topNCount}' tokens with length between '{this.minTokenLength}' and '{this.maxTokenLength}': 
{resAggregation}
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
            mostFrequentWord  = new InventoryItem(_mostFrequentWord.key, _mostFrequentWord.frequency);
            longestWord  = new InventoryItem(_longestWord.key, _longestWord.frequency);
            summaryDurationSec  = _summaryDurationSec;

            this.results = new List<QueryResult>();
            foreach(IQueryResult item in _results){
                this.results.Add((QueryResult)item);
            }
        }

        public string id { get; }
        public string idType { get; }
        public int wordsCount { get; }
        public int uniqueWordsCount { get; }
        public InventoryItem mostFrequentWord { get; }
        public InventoryItem longestWord { get; }
        public double summaryDurationSec { get; }
        public List<QueryResult> results {get; }

        public override string ToString() {

            string resAggregation = "";
            foreach(QueryResult res in this.results){
                resAggregation = resAggregation + res.ToString();
            }

        
            return $@"
            The book has id: '{id}' ({idType}) with '{wordsCount}' entries and '{uniqueWordsCount}' different ones.
            The book was processed in '{summaryDurationSec}' seconds
            Most Frequent Record: {mostFrequentWord.ToString()}
            Longest Record: {longestWord.ToString()}

            Queries Records: 
                {resAggregation}
            ";
        } 

    } 
}
