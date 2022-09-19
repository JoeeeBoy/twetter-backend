import { Comment } from "../Models/Comment.model.js";
import { Post } from "../Models/Post.model.js";

export const commentController = {
  create: async (req, res) => {
    try {
      const postId = req.params.id;
      const comment = await Comment.create({
        post: req.params.id,
        user: req.userId,
        text: req.body.text,
      });

      await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $push: { comments: comment._id },
        }
      );

      const Comm = await Comment.find({ post: req.params.id })
        .populate("user")
        .populate("post");

      res.json(Comm);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: "Не удалось добавить комментарий!",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const data = await Comment.findByIdAndDelete(req.params.id);
      console.log(data);
      const comments = await Comment.find({ post: data.post })
        .populate("user")
        .populate("post");
      res.json(comments);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Коментарий не удалось удалить!",
      });
    }
  },

  patch: async (req, res) => {
    try {
      await Comment.findByIdAndUpdate(req.body.id, {
        text: req.body.comment,
      });
      res.json({
        message: "Комментарий изменен!",
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: "Не удалось изменить комментарий!",
      });
    }
  },

  get: async (req, res) => {
    try {
      const comments = await Comment.find({ post: req.params.id })
        .populate("user")
        .populate("post");
      return res.json(comments);
    } catch (err) {
      console.log(err);
    }
  },

  addLike: async (req, res) => {
    try {
      const result = await Comment.findById(req.params.id);
      const result2 = result.likes?.includes(req.userId);
      if (result2) {
        const data = await Comment.findByIdAndUpdate(req.params.id, {
          $inc: { likeCount: -1 },
          $pull: {
            likes: req.userId,
          },
        });
        const comments = await Comment.find({ post: data.post })
          .populate("user")
          .populate("post");
        res.json(comments);
      } else {
        const data = await Comment.findByIdAndUpdate(req.params.id, {
          $push: { likes: req.userId },
          $inc: { likeCount: 1 },
        });
        const comments = await Comment.find({ post: data.post })
          .populate("user")
          .populate("post");

        res.json(comments);
      }
    } catch (err) {
      console.log(err);
    }
  },
  //   delLike: async (req, res) => {
  //     try {
  //       const data = await Comment.findByIdAndUpdate(req.params.id, {
  //         $inc: { likeCount: -1 },
  //         $pull: {
  //           likes: req.userId,
  //         },
  //       });
  //       const comments = await Comment.find({ post: data.post })
  //         .populate("user")
  //         .populate("post");
  //       res.json(comments);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
};
