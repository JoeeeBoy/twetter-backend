import express from "express";
import mongoose from "mongoose";
import users from "./Routes/user.router.js";
import posts from "./Routes/post.router.js";
import cors from "cors"

const app = express();


app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"))
app.use(users);
app.use(posts);

mongoose
  .connect(
    "mongodb+srv://adlan:begaev@cluster0.uhqp6.mongodb.net/Twit?retryWrites=true&w=majority"
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server OK");
});
