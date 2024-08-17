import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true,
    },
    email: {
        type:String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const User = mongoose.model("User", UserSchema);