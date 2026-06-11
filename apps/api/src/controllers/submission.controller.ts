import { prisma } from "@oj/db";
import type { createSubmissionInput, jobPayloadInput, paginationInput } from "@oj/types";
import type { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/response.utils.js";
import { submissionQueue } from "../queues/submission.queue.js";

const createSubmisson = async (req: Request, res: Response) => {

    const { problemId, code, language } = req.body as createSubmissionInput;

    const userId = req.user!.userId;

    const problem = await prisma.problem.findUnique({
        where: { id: problemId },
        include: { testCases: true }
    });

    if(!problem || !problem?.isPublised) return sendError(res, "problem not found", 404);

    const submission = await prisma.submission.create({
        data: {
            userId: userId,
            problemId,
            code,
            language,
            verdict: "PENDING"
        }
    });

    const payload : jobPayloadInput = {
        submissionId: submission.id,
        problemId,
        code: code,
        language: language,
        timeLimit: problem.timeLimit,
        memoryLimit: problem.memoryLimit,
        testCases: problem.testCases.map(tc => ({
            id: tc.id,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            displayInput: tc.displayInput!,
            displayOutput: tc.displayOutput!
        }))
    };

    await submissionQueue.add("judge", payload);

    sendResponse(res,"submission submitted successfully", { submissionId: submission.id }, 201);

};

const getSubmission = async (req: Request, res: Response) => {

    const { id } = req.parsedParams as { id: string};

    const submission = await prisma.submission.findUnique({
        where: { id },
        select: {
            id: true,
            verdict: true,
            language: true,
            runtime: true,
            memory: true,
            code: true,
            errorMessage:true,
            failedTestCase:true,
            totalTestCases:true,
            createdAt: true,
        }
    });

    if(!submission) return sendError(res, "submission not found", 404);

    sendResponse(res, "submisson fetched successfully", submission);

};

const getMySubmissions = async (req: Request, res: Response) => {

    const userId = req.user!.userId;

    const { page, limit } = req.parsedQuery as paginationInput;

    const skip = (page - 1 ) * limit;

    const [submissions, total] = await prisma.$transaction([
      prisma.submission.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          verdict: true,
          language: true,
          createdAt: true,
          problem: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),

      prisma.submission.count({ where: { userId: userId } }),
    ]);

    const responseData = {
        submissions,
        pagination : {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    }

    sendResponse(res, "user submission fetched succesfully", responseData);

};

export {
    createSubmisson,
    getSubmission,
    getMySubmissions
}