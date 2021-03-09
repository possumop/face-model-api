const cors = require("cors");
const express = require("express");
const knex = require("knex");
const bcrypt = require("bcrypt");

const register = require("./controllers/register");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "post",
    database: "face-model-storage",
  },
});

app.post("/register", (req, res) => {
  register(req, res, database, bcrypt);
});

app.get("/", (_req, res) => {
  res.send("https://github.com/harshcut/face-model-api");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
