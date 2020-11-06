using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;



namespace WordInventoryApp
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

        string key { get; set; }
        int frequency { get; set; }
        int length { get; set; }

    }
    public struct InventoryItem : IInventoryItem{
        public InventoryItem(string _key, int _frequency){
            key = _key;
            frequency = _frequency;
            length = _key.Length;
        }
        public InventoryItem(BsonDocument item){
            key = item["key"].AsString;
            frequency = item["frequency"].AsInt32;
            length = item["length"].AsInt32;
        }
        public string key { get; set; }
        public int frequency { get; set; }
        public int length { get; set; }
        public string ToString(Boolean addNewLine = false) => $"Record entry is for token '{key}' - Occurs '{frequency}' times in corpus - Token has '{length}' characters {(addNewLine?Environment.NewLine:"")}";
    }




    public struct _InventoryItem : IInventoryItem{
        public string key { get; set; }
        public int frequency { get; set; }
        public int length { get; set; }
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






    public struct TextSummaryAndStructures{
        public TextSummary summary { get; set;}
        public string frequencyStructure { get; set;}
        public string lengthsStructure { get; set;}
    }


    public struct TextSummary{
        public TextSummary(string _id, string _meta, int _wordsCount, int _uniqueWordsCount, IInventoryItem _mostFrequentWord, IInventoryItem _longestWord, IInventoryItem _leastFrequentWord, IInventoryItem _shortestWord, double _summaryDurationSec, List<IQueryResult> _results)
        {
            id = _id;
            meta = _meta;
            idType = _id.IndexOf("http") == -1 ? "text-hash" : "text-url";
            wordsCount  = _wordsCount;
            createdAt  = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
            uniqueWordsCount  = _uniqueWordsCount;
            mostFrequentWord  = new InventoryItem(_mostFrequentWord.key, _mostFrequentWord.frequency);
            leastFrequentWord  = new InventoryItem(_leastFrequentWord.key, _leastFrequentWord.frequency);
            longestWord  = new InventoryItem(_longestWord.key, _longestWord.frequency);
            shortestWord  = new InventoryItem(_shortestWord.key, _shortestWord.frequency);
            summaryDurationSec  = _summaryDurationSec;

            this.results = new List<QueryResult>();
            foreach(IQueryResult item in _results){
                this.results.Add((QueryResult)item);
            }
        }
        public TextSummary(DBTextSummary dbObj)
        {
            id = dbObj.id;
            meta = dbObj.meta;
            idType = dbObj.id.IndexOf("http") == -1 ? "text-hash" : "text-url";
            wordsCount  = dbObj.wordsCount;
            createdAt  = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
            uniqueWordsCount  = dbObj.uniqueWordsCount;
            mostFrequentWord  = new InventoryItem(dbObj.mostFrequentWord.key, dbObj.mostFrequentWord.frequency);
            leastFrequentWord  = new InventoryItem(dbObj.leastFrequentWord.key, dbObj.leastFrequentWord.frequency);
            longestWord  = new InventoryItem(dbObj.longestWord.key, dbObj.longestWord.frequency);
            shortestWord  = new InventoryItem(dbObj.shortestWord.key, dbObj.shortestWord.frequency);
            summaryDurationSec  = dbObj.summaryDurationSec;

            this.results = new List<QueryResult>();
        }
        public string id { get; }
        public string meta { get; }
        public string idType { get; }
        public int wordsCount { get; }
        public int uniqueWordsCount { get; }
        public InventoryItem mostFrequentWord { get; }
        public InventoryItem leastFrequentWord { get; }
        public InventoryItem longestWord { get; }
        public InventoryItem shortestWord { get; }
        public double summaryDurationSec { get; }
        public double createdAt { get; }
        public List<QueryResult> results {get; set;}

        public override string ToString() {

            string resAggregation = "";
            foreach(QueryResult res in this.results){
                resAggregation = resAggregation + res.ToString();
            }

        
            return $@"
            The text has id: '{id}' ({idType}) with '{wordsCount}' entries and '{uniqueWordsCount}' different ones.
            The text was processed at '{createdAt}' in '{summaryDurationSec}' seconds
            The text Meta '{meta}'
            Most Frequent Record: {mostFrequentWord.ToString()}
            Longest Record: {longestWord.ToString()}

            Queries Records: 
                {resAggregation}
            ";
        } 

    } 





    public class DBTextSummary
    {
        public DBTextSummary(TextSummaryAndStructures textAndStruct){
            _id = ObjectId.GenerateNewId();
            id = textAndStruct.summary.id;
            meta = textAndStruct.summary.meta;
            idType = textAndStruct.summary.idType;
            wordsCount = textAndStruct.summary.wordsCount;
            uniqueWordsCount = textAndStruct.summary.uniqueWordsCount;
            summaryDurationSec = textAndStruct.summary.summaryDurationSec;
            createdAt = textAndStruct.summary.createdAt;
            lengthsStructure = textAndStruct.lengthsStructure;
            frequencyStructure = textAndStruct.frequencyStructure;
            mostFrequentWord = textAndStruct.summary.mostFrequentWord;
            leastFrequentWord = textAndStruct.summary.leastFrequentWord;
            longestWord = textAndStruct.summary.longestWord;
            shortestWord = textAndStruct.summary.shortestWord;
        }
        public DBTextSummary(BsonDocument text){
            _id = ObjectId.GenerateNewId();
            id = text["id"].AsString;
            meta = text["meta"].AsString;
            idType = text["idType"].AsString;
            wordsCount = text["wordsCount"].AsInt32;
            uniqueWordsCount = text["uniqueWordsCount"].AsInt32;
            summaryDurationSec = text["summaryDurationSec"].AsDouble;
            createdAt = text["createdAt"].AsDouble;
            lengthsStructure = text["lengthsStructure"].AsString;
            frequencyStructure = text["frequencyStructure"].AsString;
            mostFrequentWord = new InventoryItem(text["mostFrequentWord"].ToBsonDocument());
            leastFrequentWord = new InventoryItem(text["leastFrequentWord"].ToBsonDocument());
            longestWord = new InventoryItem(text["longestWord"].ToBsonDocument());
            shortestWord = new InventoryItem(text["shortestWord"].ToBsonDocument());
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id{ get; set;}
        public string id { get; set;}
        public string meta { get; set;}
        public string idType { get; set; }
        public int wordsCount { get; set; }
        public int uniqueWordsCount { get; set; }
        public InventoryItem mostFrequentWord { get; set; }
        public InventoryItem leastFrequentWord { get; set; }
        public InventoryItem longestWord { get; set; }
        public InventoryItem shortestWord { get; set; }
        public double summaryDurationSec { get; set; }
        public double createdAt { get; set; }
        public string frequencyStructure { get; set;}
        public string lengthsStructure { get; set;}
    }

}
