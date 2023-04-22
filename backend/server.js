const express = require("express");
const app = express();
const cors = require("cors");
const _db = require("./config/index.js");
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
