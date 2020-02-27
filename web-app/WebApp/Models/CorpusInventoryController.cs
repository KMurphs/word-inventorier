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
using MongoDB.Bson.Serialization.Attributes;

namespace WebApp.Models
{
    
    public class CorpusInventoryModel
    {

        private Handler bookHandler;
        private string connection_string = "mongodb+srv://kmurphs:Murphy321!@butane-detector-cyvjy.mongodb.net/test?retryWrites=true&w=majority";
        private string dbName = "corpus-inventory";
        private string dbSummaryCollectionName = "corpus-summaries";
        private MongoClient dbClient;
        private IMongoDatabase dbCorpus;
        private IMongoCollection<DBBookSummary> dbCollection;

        public CorpusInventoryModel()
        {
            bookHandler = new Handler();
            Console.WriteLine($"Current Book Handler Version: '{bookHandler.getVersion()}'");


            connection_string = "mongodb+srv://kmurphs:Murphy321!@butane-detector-cyvjy.mongodb.net/test?retryWrites=true&w=majority";       
            dbClient = new MongoClient(connection_string);
            // var dbList = dbClient.ListDatabases().ToList();
            // MongoClient client = new MongoClient();
            // MongoServer dbServer = dbClient.GetServer();
            // MongoDatabase dbCorpus = dbServer.GetDatabase(dbName);
            // MongoCollection<DBBookSummary> dbCollection = dbCorpus.GetCollection<DBBookSummary>(dbSummaryCollectionName);
            // dbCollection.Save(p);



            dbCorpus = dbClient.GetDatabase(dbName);
            dbCollection = dbCorpus.GetCollection<DBBookSummary>(dbSummaryCollectionName);

            var dbList = dbClient.ListDatabases().ToList();
            Console.WriteLine("The list of databases on this server is: ");
            foreach (var db in dbList)
            {
                Console.WriteLine(db);
            }
        }

        public List<DBBookSummary> GetBooks(){

            // return dbCollection.Find(_ => true).ToListAsync();
            return dbCollection.Find(_ => true).ToList();
        }
    
    
        public DBBookSummary GetBookWithID(string inBook){
            string bookId = Handler.GetHashString(inBook);
            return GetBookByID(bookId);
        }
        public DBBookSummary GetBookByID(string bookId){

            // var dbFilter = Builders<BsonDocument>.Filter.Eq("id", bookId);
            // var dbDocument = dbCollection.Find(dbFilter).FirstOrDefault();
            var dbDocuments = dbCollection.Find(x => x.id == bookId).ToList();
            // Console.WriteLine(dbDocument.ToString());
            // DBBookSummary docs = (DBBookSummary)dbDocuments[0];

            return dbDocuments.Count > 0 ? (DBBookSummary)dbDocuments[0] : null;
        }
        public async Task<DBBookSummary> ProcessNewBook(string inBook){

            BookSummaryAndStructures bookSummaryAndStructures = await bookHandler.Handle(inBook);

            DBBookSummary insertData = new DBBookSummary(bookSummaryAndStructures);

            await dbCollection.InsertOneAsync(insertData);

            return insertData;
        }

        public List<IQueryResult> Query(List<Query> queries, string freqStruct, string lengthStruct){

            

            return bookHandler.Query(freqStruct, lengthStruct, queries);
        }        
    
    }
}
