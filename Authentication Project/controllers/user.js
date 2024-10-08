import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import data from "../data/fakedata.js";
// we defined all the functions in the controller folder of the user.js 


export const getAllUsers = async(req, res) => {
    
}

export const home = (req,res)=>{
    res.send(data)
}


export const login = async(req,res,next)=> {
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if (!user) {
        return res.status(404).json({
            success:false,
            message:"invalid email or password"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(404).json({
            success:false,
            message:"invalid email or password"
        })
    }

    sendCookie(user,res,"Login Successfull",201)
}

export const register = async(req, res) => {
    const {name,email,password}= req.body;
    let user = await User.findOne({email});

    if (user) {
        return res.status(404).json({
            success:false,
            message: "User already exists ! "
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    user = await User.create({name,email,password : hashedPassword});

    sendCookie(user,res,"Registered Successfully ! ",201);

}

export const getMyProfile = (req,res)=>{

   res.status(200).json({
    success:true,
    user: req.user,
   })
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true ,
    }).json({
        success:true,
        message: "Logged Out !"
       })
}