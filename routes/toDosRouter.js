/* NPM packages */
import express from "express";
const app = express();

// Models
import Todo from "../models/Todo.js";

// Get todos
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

// Save the todos when a user moves a todo to a different column
app.put("/updateColumns", async (req, res) => {
  const { todos } = req.body;
  console.log(todos);
  try {
    // delete all todos
    await Todo.deleteMany({});
    // save all todos
    let savedTodos = await Todo.insertMany(todos);
    if (savedTodos) {
      // get all todos
      const todos = await Todo.find({});
      res.status(200).json(todos);
    } else {
      res.status(401).json("No todo found");
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

// Update a todo
app.put("/", async (req, res) => {
  const { id, title, details, column } = req.body.todo;

  try {
    let updatedTodo = await Todo.findOneAndUpdate(
      {
        id: id,
      },
      {
        title: title,
        details: details,
        column: column,
      },
      { new: true }
    );
    if (updatedTodo) {
      // get all todos
      const todos = await Todo.find({});
      res.status(200).json(todos);
    } else {
      res.status(401).json("No todo found");
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

// Create a new todo
app.post("/", async (req, res, next) => {
  let { id, title, details, column } = req.body.todo;
  if (!id || !title || !details) {
    res.json("Please enter all fields");
  }
  const todo = new Todo({
    id,
    title,
    details,
    column,
  });
  try {
    const newTodo = await Todo.create(todo);
    if (newTodo) {
      // get all todos
      const todos = await Todo.find({});
      res.status(200).json(todos);
    }
  } catch (err) {
    console.log(err);
    let error = new Error("Opps something went wrong");
    next(error);
  }
});

// Delete a todo
app.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    let deletedTodo = await Todo.findOneAndDelete({
      id: id,
    });
    if (deletedTodo) {
      // get all todos
      const todos = await Todo.find({});
      res.status(200).json(todos);
    } else {
      res.status(401).json("No todo found");
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

export default app;
