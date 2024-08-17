import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type: String,
        required:true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

export const Tasks = mongoose.model("Tasks",TaskSchema);