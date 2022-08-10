import { Post } from "../Models/Post.model.js";



export const postControllers = {
  create: async (req, res) => {
    try {
      const { title, text, tags, image } = req.body;

      const post = await Post.create({
        title,
        text,
        tags,
        image,
        user: req.userId,
      });

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не удалось создать статью",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const posts = await Post.find().populate("user").exec();

      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не удалось получить статьи",
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const postId = req.params.id;
      console.log(postId);
      Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { returnDocument: "after" },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ message: "Не удалось вернуть статью" });
          }

          if (!doc) {
            return res.status(404).json({
              message: "Статья не найдена",
            });
          }

          return res.json(doc);
        }
      ).populate("user");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не удалось получить статьи",
      });
    }
  },

  remove: async (req, res) => {
    const postId = req.params.id;

    Post.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(404).json({
            message: "Не удалось удалить статью",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }

        return res.json({
          message: "Статья удалена",
        });
      }
    );
  },

  update: async (req, res) => {
    try {
      const { title, text, tags, image} = req.body;

      const postId = req.params.id;

      await Post.updateOne(
        {
          _id: postId,
        },
        {
          title,
          text,
          tags,
          image,
          user: req.userId,
        }
      );

      return res.json({
        message: "Статья обновлена",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не удалось обновить статью",
      });
    }
  },

  getLastTags: async (req, res) => {
    try {
    const posts = await Post.find().limit(5).exec()

    const tags = posts.map(obj => obj.tags).flat().slice(0, 5)

    res.json(tags)
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: "ошибка запроса"
        })
    }
  }
};
