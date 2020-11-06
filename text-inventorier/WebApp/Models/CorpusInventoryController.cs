using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WordInventoryApp;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace WordInventoryApp.WebApp.Models
{
    
    public static class CorpusInventoryModel
    {

        private static WordInventorierService wordInventorierService;
        private static string connection_string = "mongodb+srv://kmurphs:Murphy321!@butane-detector-cyvjy.mongodb.net/test?retryWrites=true&w=majority";
        private static string dbName = "corpus-inventory";
        private static string dbSummaryCollectionName = "corpus-summaries";
        private static MongoClient dbClient;
        private static IMongoDatabase dbCorpus;
        private static IMongoCollection<BsonDocument> dbCollection;

        public static Boolean isInitialized = false;

        public static void initCorpusInventoryModel()
        {
            if(isInitialized){
                return;
            }
            wordInventorierService = new WordInventorierService();
            Console.WriteLine($"Current Book WordInventorierService Version: '{wordInventorierService.getVersion()}'");
            
            isInitialized = true;

            // connection_string = "mongodb+srv://kmurphs:Murphy321!@butane-detector-cyvjy.mongodb.net/test?retryWrites=true&w=majority";       
            dbClient = new MongoClient(connection_string);
            // var dbList = dbClient.ListDatabases().ToList();
            // MongoClient client = new MongoClient();
            // MongoServer dbServer = dbClient.GetServer();
            // MongoDatabase dbCorpus = dbServer.GetDatabase(dbName);
            // MongoCollection<DBBookSummary> dbCollection = dbCorpus.GetCollection<DBBookSummary>(dbSummaryCollectionName);
            // dbCollection.Save(p);



            dbCorpus = dbClient.GetDatabase(dbName);
            dbCollection = dbCorpus.GetCollection<BsonDocument>(dbSummaryCollectionName);

            var dbList = dbClient.ListDatabases().ToList();
            Console.WriteLine("The list of databases on this server is: ");
            foreach (var db in dbList)
            {
                Console.WriteLine(db);
            }
        }

        public static List<DBTextSummary> GetBooks(){

            var books = dbCollection.Find(new BsonDocument()).ToList();

            List<DBTextSummary> res = new List<DBTextSummary>();
            foreach(BsonDocument book in books){
                res.Add(new DBTextSummary(book));
            }

            return res;
        }
    
    
        public static DBTextSummary GetBookWithID(string inBook){
            string bookId = WordInventorierService.GetHashString(inBook);
            return GetBookByID(bookId);
        }
        public static DBTextSummary GetBookByID(string bookId){

            var dbFilter = Builders<BsonDocument>.Filter.Eq("id", bookId);
            var book = dbCollection.Find(dbFilter).FirstOrDefault();
            return book != null ? new DBTextSummary(book) : null;
        }
        public static async Task<DBTextSummary> ProcessNewBook(string inBook){
            
            wordInventorierService = new WordInventorierService();
            TextSummaryAndStructures textSummaryAndStructures = await wordInventorierService.Handle(inBook);

            DBTextSummary insertData = new DBTextSummary(textSummaryAndStructures);
            var _insertData = insertData.ToBsonDocument();
            // var _insertData = JsonConvert.SerializeObject<DBTextSummary>(insertData);

            await dbCollection.InsertOneAsync(_insertData);
            // await dbCollection.InsertOneAsync(insertData);

            return insertData;
        }

        public static List<IQueryResult> Query(List<Query> queries, string freqStruct, string lengthStruct){
            wordInventorierService = new WordInventorierService();
            return wordInventorierService.Query(freqStruct, lengthStruct, queries);
        }        
    
    }
}
