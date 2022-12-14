const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
const uri = process.env.URI;

const createClient = (uri) => {
  return new MongoClient(uri);
}

module.exports = { createClient }