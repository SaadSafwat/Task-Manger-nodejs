import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: [3, "title must be at least 3 characters"],
      maxlength: [40, "title must be at most 40 characters"],
      index: true,
    },
    description: { type: String, index: true },
    dueDate: { type: Date,},
    priority: { type: String, enum: ["low", "medium", "high"], index: true },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    category: { type: String, index: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true , "user id is required"],
    },
  },
  { timestamps: true }
);

export const taskModel = mongoose.model("Task", taskSchema);
