import express from "express";
import { register,  getAllUsers,home,login, getMyProfile,logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = new express.Router();

router.get("/all",getAllUsers);

router.post("/register",register);
router.post("/login", login);
router.get("/",home);
router.get("/profile",isAuthenticated,getMyProfile);
router.get("/logout",logout);


// creating an api
// router.post("/new", createNewUsers);

// router.get("/userid/:id",findUserByid);

export default router;
