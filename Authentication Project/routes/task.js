import express from "express";
import { deleteTasks, getMyTasks, newTask, updateTasks } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated,newTask);

router.get("/mytasks",isAuthenticated, getMyTasks)

router.route("/:id").put(isAuthenticated,updateTasks).delete(isAuthenticated,deleteTasks);

export default router;