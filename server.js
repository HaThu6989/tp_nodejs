import express from "express";
import route from "./routes/routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.route.js";

dotenv.config();
const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/tp_model_complet")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    name: "simple",
    secret: "simple",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

app.use("/", route);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
