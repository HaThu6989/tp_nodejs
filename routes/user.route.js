import express from "express";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  infoUser,
  createManyUsers,
} from "../controllers/user.controller.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();
router.get("/signup", getSignup);
router.post("/signup", postSignup);
router.get("/login", getLogin);
router.post("/login", postLogin);
// router.get("/newUser", newUser);
router.get("/createManyUsers", createManyUsers);
router.get("/infoUser", authMiddleware, infoUser);

export default router;
