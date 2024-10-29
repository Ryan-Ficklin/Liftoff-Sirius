/* fields that a task should have:
    task name
    task description (optional)
    due date/time
    priority (default 1)
    unique task id?
*/

import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    due_date_time: {
        type: Date,
        required: false,
    },
    priority: {
        type: Number,
        required: false,
        default: 1,
    },
  },
  { collection: "tasks_list" }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;