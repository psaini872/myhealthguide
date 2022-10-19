import app from "./app.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
