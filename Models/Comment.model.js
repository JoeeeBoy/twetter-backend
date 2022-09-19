import mongoose from "mongoose";

const CommentShema = mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", CommentShema);
