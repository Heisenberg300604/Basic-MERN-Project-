import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

config({
    path: "./data/config.env"
})

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

// Using routes
app.use("/api/v1",userRouter);
app.use("/api/v1/task",taskRouter);

app.use(errorMiddleware);
