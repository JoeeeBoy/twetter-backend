import { postControllers } from "../controllers/Post.cont.js";
import { Router } from "express";
import { postCreateValidation } from "../validations/auth.js";
import checkAuth from "../utils/checkAuth.js";
import validationErrors from "../utils/validationErrors.js";

const router = Router();

router.get("/posts", postControllers.getAll);
router.get("/posts/:id", postControllers.getOne);
router.delete("/posts/:id", checkAuth, postControllers.remove);
router.patch(
  "/posts/:id",
  checkAuth,
  validationErrors,
  postCreateValidation,
  postControllers.update
);
router.post(
  "/posts",
  checkAuth,
  validationErrors,
  postCreateValidation,
  postControllers.create
);
router.get("/tags", postControllers.getLastTags);
export default router;
