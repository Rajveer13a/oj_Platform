import { Router } from "express";
import { getAccountVerifictionEmail, login, signup, userDetails, verifyUserAccount } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { emailVerifySchema, loginSchema, signupSchema } from "@oj/types";
import { tryCatch } from "../utils/tryCatch.utils.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const router = Router();


router.post("/signup", validate(signupSchema), tryCatch(signup));

router.post("/login", validate(loginSchema), tryCatch(login));

router.get("/me", authenticate(false), tryCatch(userDetails));

router.get("/verify", authenticate(false), tryCatch(getAccountVerifictionEmail));

router.post("/verify",validate(emailVerifySchema), tryCatch(verifyUserAccount));

export default router;
