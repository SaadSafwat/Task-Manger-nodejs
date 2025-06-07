import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await userModel.create({ username, role, email, password });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({
      message: "something went wrong on creating user",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, "jwt_secret_key");

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({
      message: "something went wrong on login",
      error: err.message,
    });
  }
};
