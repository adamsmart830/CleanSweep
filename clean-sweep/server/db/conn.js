const { MongoClient, ServerApiVersion  } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      console.log("Working");
      if (db)
      {
        _db = db.db("cleansweep");
        console.log("Successfully connected to MongoDB."); 
      }
      console.log("Finished");
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};