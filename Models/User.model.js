import mongoose from "mongoose";

const UserShema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserShema);

