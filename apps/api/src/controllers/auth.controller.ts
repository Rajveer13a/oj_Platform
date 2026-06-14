import type { Request, Response } from "express";
import type { emailVerifyInput, loginInput, signupInput } from "@oj/types";
import { prisma } from "@oj/db";
import { sendError, sendResponse } from "../utils/response.utils.js";
import bcrypt from "bcrypt";
import { signToken, type JwtPayload } from "../utils/jwt.utils.js";
import { accessTokenCookieOptions } from "../config/cookieOptions.js";
import { verifyEmailToken } from "../utils/email/verificationToken.utils.js";
import { sendEmailVerification } from "../utils/email/sendEmail.utils.js";

const signup = async (req: Request, res: Response) => {
  
  const { username, email, password } = req.body as signupInput;

  const existing = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existing) {
    return sendError(res, "email already taken", 409);
  }

  const paswordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, email, password: paswordHash },
  });

  const token = signToken({
    userId: user.id,
    role: user.role,
    isVerified: false
  });

  sendEmailVerification(user?.email!);
  
  res.cookie("accessToken", token, accessTokenCookieOptions);

  sendResponse(res, "user created succesfully", user );
};

const login = async (req: Request, res: Response) => {

  const { email, password } = req.body as loginInput;

  const user = await prisma.user.findUnique({
    where: { email },
    omit: {
      password: false,
    },
  });

  if (!user) {
    return sendError(res, "incorrect email or password", 401);
  }
  const { password: userPassword, ...userData } = user;

  const isPasswordCorrect = await bcrypt.compare(password, userPassword);

  if (!isPasswordCorrect) {
    return sendError(res, "incorrect email or password", 401);
  }

  const token = signToken({
    userId: user.id,
    role: user.role,
    isVerified: user.isVerified
  });

  res.cookie("accessToken", token, accessTokenCookieOptions);

  sendResponse(res, "login succesfull", userData );
};

const userDetails = async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      role: true,
      isVerified: true
    },
  });

  if (!user) {
    return sendError(res, "user not found", 404);
  }

  sendResponse(res, "user details fetched successfully", user);
};

const getAccountVerifictionEmail = async (req: Request, res:Response) => {

  const userId = req.user?.userId!;

  const user = await prisma.user.findUnique({
    where: {id: userId}
  })

  if(user?.isVerified){
    return sendError(res, "email is already verified");
  }

  const {data, error} = await sendEmailVerification(user?.email!);

  if(error){
    return sendError(res, "failed to send email try agian later");
  };

  sendResponse(res,"verification email send successfully", { email: user?.email });

};

const verifyUserAccount = async (req: Request, res: Response) => {

  const { verificationToken } = req.body as  emailVerifyInput;

  const { payload, errorMsg } = verifyEmailToken(verificationToken);

  if(!payload){
    return sendError(res, errorMsg!, 400);
  }

  const { email } = payload;

  await prisma.user.update({
    where: { email },
    data: {isVerified: true }
  })

  sendResponse(res,"email verified succesfully",{});

};

export {
  signup,
  login,
  userDetails,
  getAccountVerifictionEmail,
  verifyUserAccount
};
