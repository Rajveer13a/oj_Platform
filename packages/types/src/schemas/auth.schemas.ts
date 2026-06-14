import z, { email } from "zod"

export const signupSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
})

export type signupInput = z.infer<typeof signupSchema>;

export const loginSchema = signupSchema.pick({
    email: true,
    password: true
})

export type loginInput = z.infer<typeof loginSchema>;

export const emailVerifySchema = z.object({
    verificationToken : z.jwt({message: "Invalid JWT string format"})
})
export type emailVerifyInput = z.infer<typeof emailVerifySchema>;