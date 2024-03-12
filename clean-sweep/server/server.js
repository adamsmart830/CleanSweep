var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://chenw22:NNnAQCNm0fHATMLR@cluster0.4klc5mn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});