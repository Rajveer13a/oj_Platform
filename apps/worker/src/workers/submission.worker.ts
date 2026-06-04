import { QUEUE_NAMES, type jobPayloadInput } from "@oj/types";
import { Worker, type Job } from "bullmq";
import { LANGUAGE_LIMITS, type supportedLanguage } from "../config/limits.js";
import { runInSandbox } from "../sandbox/sandbox.js";
import { judgeOutput, type Verdict } from "../judge/judge.js";
import { prisma } from "@oj/db";
import { redis } from "../config/redis.js";

const processJob = async (job: Job<jobPayloadInput>) => {
  
  const { submissionId, language, code, memoryLimit, timeLimit, testCases } =
    job.data;

  console.log(`processing submission ${submissionId}`);

  const langConfig = LANGUAGE_LIMITS[language as supportedLanguage];

  let finalVerdict: Verdict = "AC";
  let totalRuntime: number = 0;

  for (const testCase of testCases) {

    const result = await runInSandbox(
      code,
      testCase.input,
      language,
      langConfig.image,
      [...langConfig.cmd],
      langConfig.ext,
      timeLimit,
      memoryLimit,
    );

    const judged = judgeOutput(
      result,
      testCase.expectedOutput,
      testCase.id,
      timeLimit,
    );

    totalRuntime = Math.max(totalRuntime, judged.runtime);

    if (judged.verdict != "AC") {
      finalVerdict = judged.verdict;
      break;
    }

  };

  await prisma.submission.update({
    where: { id: submissionId },
    data: {
      verdict: finalVerdict,
      runtime: totalRuntime,
    },
  });

  console.log(`submission ${submissionId} verdict: ${finalVerdict}`);
};

export const submissionWorker = new Worker<jobPayloadInput>(
  QUEUE_NAMES.SUBMISSION,
  processJob,
  {
    connection: redis,
    concurrency: 2,
  },
);

submissionWorker.on("completed", (job) => {
  console.log(`job ${job.id} completed`);
});

submissionWorker.on("failed", (job, err) => {
  console.error(`job ${job?.id} failed:`, err.message);
});
