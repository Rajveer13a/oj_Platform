import type { JwtPayload } from "../utils/jwt.utils.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      parsedQuery?: Record<string, unknown>;
      parsedParams?: Record<string, unknown>;
    }
  }
}