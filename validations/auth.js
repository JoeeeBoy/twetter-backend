import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Неверный формат пароля").isLength({ min: 3 }),
  body("fullName", "Имя должно быть не меньше 4 букв").isLength({ min: 4 }),
  body("avatar", "Неверная ссылка на фотографию").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Неверный формат пароля").isLength({ min: 3 }),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
  body("image", "Неверная ссылка на изображением").optional().isString(),
];
