import { Router } from "express";
import { tryCatch } from "../utils/tryCatch.utils.js";
import { getProblem, getProblems } from "../controllers/problem.controller.js";
import { paginationSchema, slugParamSchema } from "@oj/types";
import { validate } from "../middlewares/validate.middleware.js";


const router = Router();

router.get("/",validate(paginationSchema, "query"), tryCatch(getProblems));

router.get("/:slug",validate(slugParamSchema, "params"), tryCatch(getProblem));

export default router;