import mongoose from "mongoose";

//please just the name of the model titles as required

const toDoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please provide a value for 'id'"],
    },
    title: {
      type: String,
      required: [true, "Please provide a value for 'title'"],
    },
    details: {
      type: String,
      required: [true, "Please provide a value for 'details'"],
    },
    column: {
      type: String,
      required: [true, "Please provide a value for 'column'"],
    },
  },

  { useUnifiedTopology: true }
);

const Todo = mongoose.model("Todo", toDoSchema);

export default Todo;
