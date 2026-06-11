import type { SandboxResult } from "../sandbox/sandbox.js";
import { normalize } from "./normalizer.js";

export type Verdict = "AC" | "WA" | "TLE" | "MLE" | "RE" | "CE";

export interface TestCasesResult {
  testCaseId: string;
  verdict: Verdict;
  runtime: number;
  // memory: number;
}

export interface JudgeResult {
  verdict: Verdict;
  runtime: number;
}

export const judgeOutput = (
  result: SandboxResult,
  expectedOutput: string,
  testCaseId: string,
  timeLimit: number,
): TestCasesResult => {

  if (result.timedOut) {
    return { testCaseId, verdict: "TLE", runtime: timeLimit * 1000 };
  }


  let verdict: Verdict;

  if (result.exitCode !== 0) {
    
    verdict = "RE";

  } else {

    const actual = normalize(result.stdout);
    const expected = normalize(expectedOutput);

    verdict = actual === expected ? "AC" : "WA";
  }

  
  return {
    testCaseId,
    verdict,
    runtime: result.runtime
  };
  
};
