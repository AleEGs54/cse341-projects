require('dotenv').config()

const mongoClient = require('mongodb').MongoClient;
const mongodb = {}

let database;

mongodb.initDb = callback => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }
  mongoClient.connect(process.env.MONGO_URL)
    .then(client => {
      database = client;
      callback(null, database);
    })
    .catch(err => {
      callback(err);
    });
};

mongodb.getDb = () => {
  if (!database) {
    throw Error('Db not initialized');
  }
  return database;
};

module.exports = mongodb