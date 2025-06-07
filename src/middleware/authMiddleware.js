import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, "jwt_secret_key");
    const user = await userModel.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // store the user object in the request 
    req.user = user;
    return next();
  } catch (err) {
    console.error("Authentication error:", err);
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
  }
};
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You don't have permissions to access this route" });
    }
    next();
  };
};
export { authenticate, authorize };
