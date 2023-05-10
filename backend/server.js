const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/index.js");
require("dotenv").config({ path: "./.env" });
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const port = 8000;

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000", //mandatory
  credentials: true, //access-control-allow-credentials:true | mandatory
  // exposedHeaders: ["Set-Cookie"], //optional
  optionSuccessStatus: 200, //optional
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

db.connectToServer()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
