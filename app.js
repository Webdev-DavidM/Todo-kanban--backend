// I have chosen to use ES6 modules in this project rather than common js require. To do this I have added   "type": "module" in the package json file. also to note es6 modules

// importing environmental variables
import "./loadEnv.js";
import bodyParser from "body-parser";

// import express

import express from "express";
const app = express();

//cors variable
import cors from "cors";

// morgan is a middle ware which will details all http requests in the console

//cors allows http requests from other domains.

let uri = process.env.mongoURI;

// adjust the data connection below as required.

app.use(cors());

// morgan logs any http requests in the console for tracking.
import morgan from "morgan";
app.use(morgan("combined"));

// here I am importing the database which has been set up in the config folder, in node always put the filename at the end

import connectDB from "./config/db.js";
connectDB();

// es6 doesnt wrap the modules in a wrapper so __dirname doesnt exist so i am creating it below with path.resolve
import path from "path";
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// import ordersRouter from './routes/orders.js';
import toDosRouter from "./routes/toDosRouter.js";
import usersRouter from "./routes/users.js";

app.use("/todos", toDosRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.log(err);

  res.status(505).json("There has been an error");
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on port", port);
});
