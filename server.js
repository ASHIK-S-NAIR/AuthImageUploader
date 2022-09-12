const express = require("express");
require("dotenv").config();
const dbConfig = require("./setup/dbConfig");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = process.env.PORT || 4000;

dbConfig();
app.use(express.json());

const authRoute = require("./src/api/v1/routes/auth");
const imageRoute = require("./src/api/v1/routes/image");

app.use(morgan("dev"));
app.use(helmet());

app.use("/api/v1", authRoute);
app.use("/api/v1", imageRoute);

app.get("/", (req, res) => {
    res.send("Rest api method in nodejs which allows only authenticated users to upload the image of maximum size of 500KB.");
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
