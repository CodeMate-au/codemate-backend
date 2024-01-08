import { Request, Response } from "express";
import { getGithubUser, getGithubOathToken } from "../services/github.service";
import prisma from "../prisma";
import { createToken } from "../services/jwt.service";

const githubLoginHandler = async (req: Request, res: Response) => {
  const params = {
    scope: "read:user",
    client_id: process.env.GITHUB_OAUTH_CLIENT_ID as string,
  };

  // Convert parameters to a URL-encoded string
  const urlEncodedParams = new URLSearchParams(params).toString();
  res.redirect(`https://github.com/login/oauth/authorize?${urlEncodedParams}`);
};

const githubRedirectHandler = async (req: Request, res: Response) => {
  try {
    const { code } = req.query as { code: string };
    // console.log("github code:", code);

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

    let user = await prisma.user.upsert({
      where: {
        githubId: githubUser.login,
      },
      update: {
        email: githubUser.email || undefined,
        name: githubUser.name || undefined,
        githubId: githubUser.login,
        avatar: githubUser.avatar_url,
      },
      create: {
        email: githubUser.email || undefined,
        name: githubUser.name || undefined,
        githubId: githubUser.login,
        avatar: githubUser.avatar_url,
      },
    });

    const token = createToken(user.id);
    // res.status(200).json({
    //   MessageChannel: "Login Successful",
    //   token,
    //   user,
    // });
    // console.log("session token", token);
    res.cookie("session-token", token, {
      httpOnly: true,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
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

export default { githubRedirectHandler, githubLoginHandler };
