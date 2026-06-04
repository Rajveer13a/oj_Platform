import { prisma } from "@oj/db"
import type { Request, Response } from "express"
import { sendError, sendResponse } from "../utils/response.utils.js";
import type { createBoilerPlateInput, createProblemInput, createTestCasesInput, idParamInput, paginationInput, slugParamInput } from "@oj/types";

const getProblems = async (req: Request, res: Response) => {

    const { page , limit } = req.parsedQuery as unknown as paginationInput;
    const skip = ( page - 1 ) * limit;

    const [problems, total] = await prisma.$transaction([
      prisma.problem.findMany({
        where: { isPublised: true },
        select: {
          id: true,
          slug: true,
          title: true,
          timeLimit: true,
          memoryLimit: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),

      prisma.problem.count({
        where: { isPublised: true },
      }),

    ]); 


    const responseDate = {
        problems,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    }

    return sendResponse(res,"problems fetched successfully", responseDate);
}

const getProblem = async (req: Request, res: Response) => {

    const { slug } = req.parsedParams as slugParamInput;

    const problem = await prisma.problem.findUnique({
        where: { slug },
        include: {
            testCases: {
                where: { isSample: true }
            }
        }
    });

    if(!problem){
        return sendError(res,"problem not found", 404);
    }

    sendResponse(res,"problem fetched successfully",problem );

}

const createProblem = async (req: Request, res: Response) => {

    const { slug, title, description, memoryLimit, timeLimit } = req.body as createProblemInput;

    const existing = await prisma.problem.findUnique({
        where: {slug}
    });

    if(existing){
        return sendError(res, "slug already exists", 409)
    };

    const problem = await prisma.problem.create({
        data:{ slug, title, description, memoryLimit, timeLimit }
    });

    sendResponse(res, "problem created succesfully", problem, 201);

}

const addTestCases = async (req: Request, res: Response) => {

    const {id} = req.parsedParams as idParamInput;

    const { testCases } = req.body as createTestCasesInput;

    const problem = await prisma.problem.findUnique({ where: { id } });

    if(!problem) sendError(res,"problem not found",404);

    await prisma.testCase.createMany({
      data: testCases.map((tc) => ({
        problemId: id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isSample: tc.isSample,
      })),
    });

    sendResponse(res,"test cases added succesfully", {testCasesTotal: testCases.length});

}

const publishProblem = async (req: Request, res: Response) => {
    
    const {id} = req.parsedParams as idParamInput;

    const problem = await prisma.problem.update({
        where: {id },
        data: {isPublised: true}
    });

    sendResponse(res,"problem published succesfully", problem);
}

const addBoilerplate = async (req: Request, res: Response) => {

    const {id} = req.parsedParams as idParamInput;

    const { language, driverCode, starterCode} = req.body as createBoilerPlateInput;

    const boilerplate = await prisma.boilerplate.upsert({
      where: { problemId_language: { problemId: id, language } },
      update: { starterCode, driverCode },
      create: { problemId: id, language, starterCode, driverCode },
    });

    sendResponse(res, "boilerplate added successfully", boilerplate);
}

export {
    getProblems,
    getProblem,
    createProblem,
    addTestCases,
    publishProblem,
    addBoilerplate
}