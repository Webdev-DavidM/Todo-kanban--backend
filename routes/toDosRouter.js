/* NPM packages */
import express from "express";
const app = express();

/* Middleware */
import jwtVerify from "../middleware/jwtVerify.js";
import Todo from "../models/Todo.js";

/* Models */

// Get todos

// app.get("todos", jwtVerify, async (req, res, next) => {
app.get("/", async (req, res, next) => {
  try {
    let todos = await Todo.find({});
    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(401).json("No todos found");
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

// Update a todo

app.put("/:todoId", jwtVerify, async (req, res) => {});

// Create a new todo

// app.post("/", jwtVerify, async (req, res, next) => {
app.post("/", async (req, res, next) => {
  let { id, title, details } = req.body.todo;
  console.log(id, title, details);
  const todo = new Todo({
    id,
    title,
    details,
  });
  try {
    let newTodo = await Todo.create(todo);
    if (newTodo) {
      res.status(201).json(newTodo);
    }
  } catch (err) {
    console.log(err);
    let error = new Error("Opps something went wrong");
    next(error);
  }
});

// Delete a todo
// app.delete("/:todoId", jwtVerify, async (req, res) => {
app.delete("/", async (req, res) => {
  try {
    let deletedTodo = await Todo.findOne({
      id: "22222",
    });
    if (deletedTodo) {
      res.status(200).json(deletedTodo);
    } else {
      res.status(401).json("No todo found");
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

export default app;
