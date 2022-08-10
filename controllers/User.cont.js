import { User } from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export const userController = {
  userRegist: async (req, res) => {
    try {
      const { fullName, email, avatar } = req.body;
      const password = req.body.password;

      const salt = await bcrypt.genSalt(10);
      const Hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        email,
        fullName,
        passwordHash: Hash,
        avatar,
      });

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "adlan",
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = user._doc;
      res.json({
        ...userData,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не удалось зарегестрироваться",
      });
    }
  },

  userAuth: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
      );

      if (!isValidPass) {
        return res.status(403).json({
          message: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "adlan",
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = user._doc;
      res.json({
        ...userData,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не удалось авторизоваться",
      });
    }
  },

  userGet: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }
      const { passwordHash, ...userData } = user._doc;
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Нет доступа",
      });
    }
  },
  uploads: (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  }
};
