import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import { commentController } from "../controllers/Comment.cont.js";

const router = Router();

router.get("/posts/:id/comments", commentController.get);
router.post("/posts/:id/comments", checkAuth, commentController.create);
router.delete("/comments/:id", checkAuth, commentController.delete);
router.patch("/posts/:id/comments", checkAuth, commentController.patch);
// router.patch("/comments/:id/delLike", checkAuth, commentController.delLike);
router.patch("/comments/:id/addlike", checkAuth, commentController.addLike);

export default router;
