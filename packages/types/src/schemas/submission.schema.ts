import z from "zod";

export const createSubmissionSchema = z.object({
    problemId: z.string().uuid(),
    language: z.enum(["javascript", "python"]),
    code: z.string().min(1).max(50000)
});

export type createSubmissionInput = z.infer<typeof createSubmissionSchema>;
