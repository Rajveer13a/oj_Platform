import jwt, { type Jwt } from "jsonwebtoken";
import { env } from "../../config/env";

const signedEmailToken = (email: string) => {
  const token = jwt.sign({ email }, env.EMAIL_VERIFICATION_JWT_SECRET, {
    expiresIn: "15m",
  });

  return token;
};

export const verifyEmailToken = (token: string) => {
  let payload;
  let errorMsg;

  try {
    payload = jwt.verify(token, env.EMAIL_VERIFICATION_JWT_SECRET);
  } catch (error) {

    switch (error.name) {
      case "TokenExpiredError":
        errorMsg =
          "Your verification link has expired. Please request a new one to continue.";
        break;
      case "JsonWebTokenError":
        errorMsg =
          "The verification link is invalid or has been tampered with. Please check the link or request a new one.";
        break;
      case "TokenExpiredError":
        errorMsg =
          "Your verification link has expired. Please request a new one to continue.";
        break;

      default:
        errorMsg =
          "We couldn't verify your email at the moment. Please try again or contact support.";
        break;
    }

  }

  return { payload, errorMsg };
};
