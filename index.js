import express from "express";
import { databaseConnection } from "./src/config/db.js";
import userRouter from "./src/routes/authRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

databaseConnection();

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app
  .listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.log(`something went wrong ${err}`);
  });
