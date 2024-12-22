import express from "express";
import { registerWithEmail, loginWithEmail } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", registerWithEmail);
router.post("/login", loginWithEmail);

export default router;
