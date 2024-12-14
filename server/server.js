require("dotenv").config();
const express = require("express");
const app = express();
const listRoutes = require("./routes/lists");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/lists", listRoutes);

//connect to mongoDB(Atlas)
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(process.env.PORT, () =>
        console.log(
          "Connected to the db and listening on port:",
          process.env.PORT
        )
      );
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = app;
