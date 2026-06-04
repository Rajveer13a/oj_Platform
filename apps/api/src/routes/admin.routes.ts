import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { addBoilerplate, addTestCases, createProblem, publishProblem } from "../controllers/problem.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createBoilerplateSchema, createProblemSchema, createTestCasesSchema, idParamSchema } from "@oj/types";
import { tryCatch } from "../utils/tryCatch.utils.js";

const router = Router();

router.use(authenticate);

router.use(authorize("ADMIN"));

router.post("/problems", validate(createProblemSchema), tryCatch(createProblem));

router.post("/problems/:id/testcases", validate(idParamSchema, "params"), validate(createTestCasesSchema), tryCatch(addTestCases));

router.patch("/problems/:id/publish", validate(idParamSchema, "params"), tryCatch(publishProblem));

router.post("/problems/:id/boilerplate", validate(idParamSchema, "params"), validate(createBoilerplateSchema), tryCatch(addBoilerplate) );

export default router;