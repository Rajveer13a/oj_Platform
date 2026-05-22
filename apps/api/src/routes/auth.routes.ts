import { Router } from "express";
import { login, signup, userDetails } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, signupSchema } from "@oj/types";
import { tryCatch } from "../utils/tryCatch.utils.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const router = Router();


router.post("/signup", validate(signupSchema), tryCatch(signup));

router.post("/login", validate(loginSchema), tryCatch(login));

router.get("/me", authenticate, tryCatch(userDetails));

export default router;
