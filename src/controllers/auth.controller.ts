import { Request, Response } from "express";
import { getGithubUser, getGithubOathToken } from "../services/github.service";
import { PrismaClient } from "@prisma/client";
import { createToken } from "../services/jwt.service";

const prisma = new PrismaClient();
const login = async (req: Request, res: Response) => {
  try {
    const { code } = req.query as { code: string };
    // console.log("code here:", code);

    // Check if the code is present
    if (!code || typeof code !== "string") {
      return res
        .status(400)
        .json({ error: "Missing Github Code required for authentication" });
    }

    const githubaccessToken = await getGithubOathToken({ code });
    // console.dir(githubaccessToken);
    const githubUser = await getGithubUser({
      access_token: githubaccessToken.access_token,
    });

    // console.log("githubUser:", githubUser);

    let user = await prisma.user.findUnique({
      where: {
        email: githubUser.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: githubUser.email,
          name: githubUser.name,
          githubId: githubUser.login,
          avatar: githubUser.avatar_url,
        },
      });
    }

    const token = createToken(user.id);
    res.status(200).json({
      MessageChannel: "Login Successful",
      token,
      user,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: err });
      res.status(500).json({ error: "Something went wrong" });
    }
  }
};

export default { login };
