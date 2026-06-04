import z from "zod";

export const jobPayloadSchema = z.object({
    submissionId : z.string().uuid(),
    problemId : z.string().uuid(),
    language: z.enum(["javascript", "python"]),
    code: z.string(),
    timeLimit: z.number(),
    memoryLimit: z.number(),
    testCases: z.array(z.object({
        id: z.string().uuid(),
        input: z.string(),
        expectedOutput: z.string()
    }))

});

export type jobPayloadInput = z.infer<typeof jobPayloadSchema>;