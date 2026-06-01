import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSubmissionSchema, idParamSchema, paginationSchema } from "@oj/types";
import { createSubmisson, getMySubmissions, getSubmission } from "../controllers/submission.controller.js";
import { tryCatch } from "../utils/tryCatch.utils.js";


const router = Router();

router.use(authenticate);

router.post("/", validate(createSubmissionSchema), tryCatch(createSubmisson));

router.get("/", validate(paginationSchema, "query"), tryCatch(getMySubmissions));

router.get("/:id", validate(idParamSchema, "params"), tryCatch(getSubmission));

export default router;