const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const indexHtml = path.join(__dirname + "/index.html");

app.get("/", function(req, res) {
  return res.sendFile(indexHtml);
});

app.get("/questions", (req, res) => {
  const MongoClient = require("mongodb").MongoClient;

  // Connection URL
  const url = process.env.MONGODB_URI;

  // Database Name
  const dbName = "heroku_nndjz5dt";

  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(async function(err, client) {
    const db = client.db(dbName);
    const questions = await db
      .collection("questions")
      .find()
      .toArray();

    const random_question =
      questions[Math.floor(Math.random() * questions.length)];

    return res.json([random_question]);
  });
});

app.get("/app.js", (req, res) =>
  res.sendFile(path.join(__dirname + "/app.js"))
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
