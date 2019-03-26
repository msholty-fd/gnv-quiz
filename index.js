const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));

app.get("/questions", (req, res) => {
  const MongoClient = require("mongodb").MongoClient;

  // Connection URL
  const url =
    "mongodb://heroku_j1nq77kg:mmplvif6i2n82dqsq67iva33a8@ds221416.mlab.com:21416/heroku_j1nq77kg";

  // Database Name
  const dbName = "heroku_j1nq77kg";

  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(async function(err, client) {
    const db = client.db(dbName);
    const questions = await db
      .collection("questions")
      .find()
      .toArray();

    return res.json(questions);
  });
});

app.get("/app.js", (req, res) =>
  res.sendFile(path.join(__dirname + "/app.js"))
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
