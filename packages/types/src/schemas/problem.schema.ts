import z from "zod";

export const createProblemSchema = z.object({
    slug: z.string().min(3),
    title: z.string().min(3),
    description: z.string().min(6),
    timeLimit: z.number().min(1).max(10).default(2),
    memoryLimit: z.number().min(64).max(512).default(256)
});


const testCaseSchema = z.object({
    input: z.string(),
    expectedOutput: z.string(),
    isSample: z.boolean().default(false)
});

export const createTestCasesSchema = z.object({
    testCases: z.array(testCaseSchema).min(1,"at least on test is required")
})

export type createProblemInput = z.infer<typeof createProblemSchema>;
export type createTestCasesInput = z.infer<typeof createTestCasesSchema>;