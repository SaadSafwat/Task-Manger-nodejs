import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/taskManager");
    console.log("database connected");
  } catch (error) {
    console.log(`something went wrong on connecting on database ${error}`);
  }
};
