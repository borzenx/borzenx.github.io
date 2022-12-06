const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const app = express();
const users = [];

// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/users", function (req, res) {
  res.send(users);
});

app.post("/add", function (req, res) {
  const { name, lastName } = req.body;
  const id = uuidv4();
  users.push({
    id,
    name,
    lastName,
  });
  res.send({ message: `Added user ${(id, name, lastName)}` });
});

app.put("/update", function (req, res) {
  const { id, name, lastName } = req.body;
  const i = users.findIndex((obj) => obj.id === id);
  users[i] = { id, name, lastName };
  res.send("Success");
});

//status i odpowiedz
app.delete("/delete", function (req, res) {
  const id = req.body.id;

  const i = users.findIndex((obj) => obj.id == id);
  users.splice(i, 1);
  res.send({ message: `deleted id ${id} on index ${i}` });
});

app.listen(3000);
