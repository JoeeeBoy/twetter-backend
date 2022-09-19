import { Router } from "express";
import { userController } from "../controllers/User.cont.js";
import { registerValidation, loginValidation } from "../validations/auth.js";
import validationErrors from "../utils/validationErrors.js";
import checkAuth from "../utils/checkAuth.js";
import multer from "multer";


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "uploads");
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

const router = Router();

router.post(
  "/auth/register",
  registerValidation,
  validationErrors,
  userController.userRegist
);
router.post(
  "/auth/login",
  loginValidation,
  validationErrors,
  userController.userAuth
);
router.get("/auth/me", checkAuth, userController.userGet);
router.post("/uploads", checkAuth, upload.single("image"), userController.uploads)


export default router;
