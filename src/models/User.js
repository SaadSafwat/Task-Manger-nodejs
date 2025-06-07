import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [3, "username must be at least 3 characters"],
      maxlength: [20, "username must be at most 20 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
        },
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
      },
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },

  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const userModel = mongoose.model("User", userSchema);
