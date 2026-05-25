import z from "zod";

export const paginationSchema = z.object({
    page: z.string().optional().transform(val => parseInt(val || "1") ),
    limit: z.string().optional().transform(val => Math.min( parseInt(val || "20"), 100  ) )
});

export const slugParamSchema = z.object({
    slug: z.string().min(3).max(100)
});

export const idParamSchema = z.object({
    id: z.string().uuid("invalid id format")
})

export type paginationInput = z.infer<typeof paginationSchema>;
export type slugParamInput = z.infer<typeof slugParamSchema>;
export type idParamInput = z.infer<typeof idParamSchema>;