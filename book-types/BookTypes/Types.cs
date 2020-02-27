using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;



namespace BookTypes
{

    public struct Query{

        public Query(int _topN, int _minLength, int _maxLength){
            this.topN = _topN;
            this.minLength = _minLength;
            this.maxLength = _maxLength;
        }
        public int topN { get; set; }
        public int minLength { get; set; }
        public int maxLength { get; set; }

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
        double createdAt { get; }
        double durationMs { get; }
        List<InventoryItem> data { get; }
    }
    public struct QueryResult : IQueryResult{
        public QueryResult(double _durationMs, List<InventoryItem> _data, int _minTokenLength, int _maxTokenLength, int _topNCount){
            this.durationMs = _durationMs;
            this.minTokenLength = _minTokenLength;
            this.maxTokenLength = _maxTokenLength;
            this.topNCount = _topNCount;
            this.createdAt = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
            this.data = _data;
        }
        public QueryResult(double _durationMs, List<IInventoryItem> _data, int _minTokenLength, int _maxTokenLength, int _topNCount){
            this.durationMs = _durationMs;
            this.createdAt = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
            this.data = new List<InventoryItem>();
            this.minTokenLength = _minTokenLength;
            this.maxTokenLength = _maxTokenLength;
            this.topNCount = _topNCount;
            foreach(IInventoryItem item in _data){
                this.data.Add((InventoryItem)item);
            }
        }
        public double durationMs { get; }
        public double createdAt { get; }
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






    public struct BookSummaryAndStructures{
        public BookSummary summary { get; set;}
        public string frequencyStructure { get; set;}
        public string lengthsStructure { get; set;}
    }


    public struct BookSummary{
        public BookSummary(string _id, string _meta, int _wordsCount, int _uniqueWordsCount, IInventoryItem _mostFrequentWord, IInventoryItem _longestWord, double _summaryDurationSec, List<IQueryResult> _results)
        {
            id = _id;
            meta = _meta;
            idType = _id.IndexOf("http") == -1 ? "book-hash" : "book-url";
            wordsCount  = _wordsCount;
            createdAt  = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
            uniqueWordsCount  = _uniqueWordsCount;
            mostFrequentWord  = new InventoryItem(_mostFrequentWord.key, _mostFrequentWord.frequency);
            longestWord  = new InventoryItem(_longestWord.key, _longestWord.frequency);
            summaryDurationSec  = _summaryDurationSec;

            this.results = new List<QueryResult>();
            foreach(IQueryResult item in _results){
                this.results.Add((QueryResult)item);
            }
        }
        public BookSummary(DBBookSummary dbObj)
        {
            id = dbObj.id;
            meta = dbObj.meta;
            idType = dbObj.id.IndexOf("http") == -1 ? "book-hash" : "book-url";
            wordsCount  = dbObj.wordsCount;
            createdAt  = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
            uniqueWordsCount  = dbObj.uniqueWordsCount;
            mostFrequentWord  = new InventoryItem(dbObj.mostFrequentWord.key, dbObj.mostFrequentWord.frequency);
            longestWord  = new InventoryItem(dbObj.longestWord.key, dbObj.longestWord.frequency);
            summaryDurationSec  = dbObj.summaryDurationSec;

            this.results = new List<QueryResult>();
        }
        public string id { get; }
        public string meta { get; }
        public string idType { get; }
        public int wordsCount { get; }
        public int uniqueWordsCount { get; }
        public InventoryItem mostFrequentWord { get; }
        public InventoryItem longestWord { get; }
        public double summaryDurationSec { get; }
        public double createdAt { get; }
        public List<QueryResult> results {get; set;}

        public override string ToString() {

            string resAggregation = "";
            foreach(QueryResult res in this.results){
                resAggregation = resAggregation + res.ToString();
            }

        
            return $@"
            The book has id: '{id}' ({idType}) with '{wordsCount}' entries and '{uniqueWordsCount}' different ones.
            The book was processed at '{createdAt}' in '{summaryDurationSec}' seconds
            The book Meta '{meta}'
            Most Frequent Record: {mostFrequentWord.ToString()}
            Longest Record: {longestWord.ToString()}

            Queries Records: 
                {resAggregation}
            ";
        } 

    } 





    public class DBBookSummary
    {
        public DBBookSummary(BookSummaryAndStructures bookAndStruct){
            id = bookAndStruct.summary.id;
            meta = bookAndStruct.summary.meta;
            idType = bookAndStruct.summary.idType;
            wordsCount = bookAndStruct.summary.wordsCount;
            uniqueWordsCount = bookAndStruct.summary.uniqueWordsCount;
            summaryDurationSec = bookAndStruct.summary.summaryDurationSec;
            createdAt = bookAndStruct.summary.createdAt;
            lengthsStructure = bookAndStruct.lengthsStructure;
            frequencyStructure = bookAndStruct.frequencyStructure;
            mostFrequentWord = bookAndStruct.summary.mostFrequentWord;
            longestWord = bookAndStruct.summary.longestWord;
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ObjectId { get; set;}
        public string id { get; set;}
        public string meta { get; set;}
        public string idType { get; set; }
        public int wordsCount { get; set; }
        public int uniqueWordsCount { get; set; }
        public InventoryItem mostFrequentWord { get; set; }
        public InventoryItem longestWord { get; set; }
        public double summaryDurationSec { get; set; }
        public double createdAt { get; set; }
        public string frequencyStructure { get; set;}
        public string lengthsStructure { get; set;}
    }

}
