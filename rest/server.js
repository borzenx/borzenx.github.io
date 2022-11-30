const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const users = [
  { name: "Adam", lastName: "Mostowiak" },
  { name: "Henryk", lastName: "Motyka" },
  { name: "Blazej", lastName: "Slonecznik" },
  { name: "Andrzej", lastName: "Kowalski" },
  { name: "Mariusz", lastName: "Pudziankowski" },
];

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
  users.push({
    name: name,
    lastName: lastName,
  });
});

app.put("/update", function (req, res) {
  const { id, name, lastName } = req.body;
  res.send((users[id].name = name));
  res.send((users[id].lastName = lastName));
});

app.delete("/delete", function (req, res) {
  const id = req.body.id;
  users.splice(id, 1);
});

app.listen(3000);
console.log("http://localhost:3000");
