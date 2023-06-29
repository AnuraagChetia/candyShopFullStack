const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");
const candyRouter = require("./routes/candy");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/", candyRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
