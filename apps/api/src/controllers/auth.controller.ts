import type { Request, Response } from "express";
import type { signupInput } from "@oj/types";
import { prisma } from "@oj/db";
import { sendError, sendResponse } from "../utils/response.utils.js";
import { log } from "node:console";
import bcrypt from "bcrypt";

const signup = async (req: Request, res: Response) => {
  
  const { username, email, password } = req.body as signupInput;

  try {

    const existing = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if(existing) {
      return sendError(res,"email already taken", 409);
    }

    const paswordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: paswordHash}
    });

    sendResponse(res, {message: "user created succesfully"}, 200);

  } catch (error) {
    log(error);
    sendError(res, "something went wrong", 409);
  }
};

export { signup };
