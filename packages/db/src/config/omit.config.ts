import type { PrismaClient } from "../../generated/prisma/client.js"

type ClientOptions = NonNullable<ConstructorParameters<typeof PrismaClient>[0]>;

export const omitConfig = {
    user: {
        password: true
    }
} satisfies ClientOptions['omit']