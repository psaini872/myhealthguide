import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";
import mongoose from "mongoose";
const app = express();
app.use(cors());
app.use(express.json());

// DATABASE CONNECTON

dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE;
const local = "mongodb://localhost:27017/caloriescounter";
const main = async () => {
  const con = await mongoose.connect(db);
  console.log(con.connection);
  console.log("scc connect to db");
};
main().catch((err) => console.log(err));

// MAIN ROUTE

app.use("/api/v1/food", foodRouter);
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
