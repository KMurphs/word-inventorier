using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BookHandler;
using BookTypes;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace WebApp.Models
{
    
    public static class CorpusInventoryModel
    {

        private static Handler bookHandler;
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
            bookHandler = new Handler();
            Console.WriteLine($"Current Book Handler Version: '{bookHandler.getVersion()}'");
            
            isInitialized = true;

            connection_string = "mongodb+srv://kmurphs:Murphy321!@butane-detector-cyvjy.mongodb.net/test?retryWrites=true&w=majority";       
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

        public static List<DBBookSummary> GetBooks(){

            var books = dbCollection.Find(new BsonDocument()).ToList();

            List<DBBookSummary> res = new List<DBBookSummary>();
            foreach(BsonDocument book in books){
                res.Add(new DBBookSummary(book));
            }

            return res;
        }
    
    
        public static DBBookSummary GetBookWithID(string inBook){
            string bookId = Handler.GetHashString(inBook);
            return GetBookByID(bookId);
        }
        public static DBBookSummary GetBookByID(string bookId){

            var dbFilter = Builders<BsonDocument>.Filter.Eq("id", bookId);
            var book = dbCollection.Find(dbFilter).FirstOrDefault();
            return book != null ? new DBBookSummary(book) : null;
        }
        public static async Task<DBBookSummary> ProcessNewBook(string inBook){
            
            bookHandler = new Handler();
            BookSummaryAndStructures bookSummaryAndStructures = await bookHandler.Handle(inBook);

            DBBookSummary insertData = new DBBookSummary(bookSummaryAndStructures);
            var _insertData = insertData.ToBsonDocument();
            // var _insertData = JsonConvert.SerializeObject<DBBookSummary>(insertData);

            await dbCollection.InsertOneAsync(_insertData);
            // await dbCollection.InsertOneAsync(insertData);

            return insertData;
        }

        public static List<IQueryResult> Query(List<Query> queries, string freqStruct, string lengthStruct){
            bookHandler = new Handler();
            return bookHandler.Query(freqStruct, lengthStruct, queries);
        }        
    
    }
}
