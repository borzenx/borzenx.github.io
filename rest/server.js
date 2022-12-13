const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId; 
const uri =
  "mongodb+srv://admin:admin@cluster0.catjmgw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const database = client.db("test");
const users = database.collection("users");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/users", async function (req, res) {
  res.send(await users.find().toArray());
});

app.post("/add", function (req, res) {
  const { name, lastName } = req.body;
  
  users.insertOne({ name, lastName });
  
  res.send({ message: `Added user: ${name} ${lastName}` });
});

app.put("/update", function (req, res) {
  const { _id, name, lastName } = req.body;
  const query = {_id: ObjectId(_id)};

  // const replace = {name,lastName};
  // users.replaceOne(query, replace);

  const update = {$set: {name,lastName}}
  users.updateOne(query,update);

  res.send({ message: `Updated user: ${_id}` });
});

app.delete("/delete", function (req, res) {
  const _id = req.body._id;

  users.findOneAndDelete({_id: ObjectId(_id)})
  
  res.send({ message: `Deleted user: ${_id}` });
});

app.listen(3000);
