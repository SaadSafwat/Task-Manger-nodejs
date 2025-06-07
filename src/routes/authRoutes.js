import express from "express";
import { login, signUp } from "../controller/authController.js";

const userRouter = express.Router();

// to sign up make the method post and the url http://localhost:3000/users/signUp
// send this data in body 
// { username, email, password, role }
userRouter.post("/signUp", signUp);

// to login make the method post and the url http://localhost:3000/users/login
// send this data in body 
// { email, password }
userRouter.post("/login", login);


export default userRouter;