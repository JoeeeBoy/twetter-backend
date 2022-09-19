import mongoose from "mongoose";

const PostShema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }],
    image: String,
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", PostShema);
