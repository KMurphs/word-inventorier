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
            Console.WriteLine($"Current Text WordInventorierService Version: '{wordInventorierService.getVersion()}'");
            
            isInitialized = true;

            // connection_string = "mongodb+srv://kmurphs:Murphy321!@butane-detector-cyvjy.mongodb.net/test?retryWrites=true&w=majority";       
            dbClient = new MongoClient(connection_string);
            // var dbList = dbClient.ListDatabases().ToList();
            // MongoClient client = new MongoClient();
            // MongoServer dbServer = dbClient.GetServer();
            // MongoDatabase dbCorpus = dbServer.GetDatabase(dbName);
            // MongoCollection<DBTextSummary> dbCollection = dbCorpus.GetCollection<DBTextSummary>(dbSummaryCollectionName);
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

        public static List<DBTextSummary> GetTexts(){

            var texts = dbCollection.Find(new BsonDocument()).ToList();

            List<DBTextSummary> res = new List<DBTextSummary>();
            foreach(BsonDocument text in texts){
                res.Add(new DBTextSummary(text));
            }

            return res;
        }
    
    
        public static DBTextSummary GetTextWithID(string inText){
            string textId = WordInventorierService.GetHashString(inText);
            return GetTextByID(textId);
        }
        public static DBTextSummary GetTextByID(string textId){

            var dbFilter = Builders<BsonDocument>.Filter.Eq("id", textId);
            var text = dbCollection.Find(dbFilter).FirstOrDefault();
            return text != null ? new DBTextSummary(text) : null;
        }
        public static async Task<DBTextSummary> ProcessNewText(string inText){
            
            wordInventorierService = new WordInventorierService();
            TextSummaryAndStructures textSummaryAndStructures = await wordInventorierService.Handle(inText);

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
