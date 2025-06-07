import express from "express";
import {
  createTask,
  deleteTask,
  filterTasks,
  searchTasks,
  updateTask,
} from "../controller/taskController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const taskRouter = express.Router();

// to create task make the method post and the url http://localhost:3000/tasks/create-task
// send this data in body
// { title, description, dueDate, priority, status, category }
taskRouter.post("/create-task", authenticate, createTask);

// to update task make the method put and the url http://localhost:3000/tasks/update-task/:id
// send this data in body
// { title, description, dueDate, priority, status, category }
taskRouter.put("/update-task/:id", authenticate, updateTask);

// to delete task make the method delete and the url http://localhost:3000/tasks/delete-task/:id
taskRouter.delete("/delete-task/:id", authenticate, deleteTask);

// to filter tasks make the method get and the url http://localhost:3000/tasks/filter-tasks
// send this data in query params
// { priority, status, category }
taskRouter.get("/filter-tasks" , authenticate , filterTasks)

// to search tasks make the method get and the url http://localhost:3000/tasks/search-tasks
// send this data in query params
// { title }
taskRouter.get("/search-tasks" , authenticate , searchTasks)

export default taskRouter;
