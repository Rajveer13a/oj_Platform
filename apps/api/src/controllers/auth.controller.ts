import type { Request, Response } from "express";
import type { loginInput, signupInput } from "@oj/types";
import { prisma } from "@oj/db";
import { sendError, sendResponse } from "../utils/response.utils.js";
import bcrypt from "bcrypt";
import { signToken, type JwtPayload } from "../utils/jwt.utils.js";
import { accessTokenCookieOptions } from "../config/cookieOptions.js";

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
  });

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
    },
  });

  if (!user) {
    return sendError(res, "user not found", 404);
  }

  sendResponse(res, "user details fetched successfully", user);
};

export {
  signup,
  login,
  userDetails
};
