import { ErrorHandler } from "../middlewares/error.js";
import { Tasks } from "../models/task.js";


// Create

export const newTask = async (req, res, next) => {
    const { title, description } = req.body;

    await Tasks.create({
        title,
        description,
        user: req.user
    });

    res.status(201).json({
        success: true,
        message: "task created successFully !"
    })
}

// Read

export const getMyTasks = async (req, res, next) => {
    const userid = req.user._id;

    const tasks = await Tasks.find({ user: userid });

    res.status(200).json({
        success: true,
        message: "Fetched user tasks successfully ! ",
        tasks,
    })
}


// Update 

export const updateTasks = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findById(id);
        // if(!task){

        // }
        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "task updated ! ",
        })
    } catch (error) {
        return next(new Error(error.message))
    }
}

// Delete

export const deleteTasks = async (req, res, next) => {
    const { id } = req.params;

    try {
        const task = await Tasks.findById(id);
        console.log(task);

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "task deleted ! ",
        })
    } catch (error) {
        return next(new ErrorHandler("Invalid UserID", 400))
    }
}