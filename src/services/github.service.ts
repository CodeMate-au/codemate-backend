import axios from "axios";
import { access } from "fs";
import qs from "qs";

const GITHUB_OAUTH_CLIENT_ID = process.env
  .GITHUB_OAUTH_CLIENT_ID as unknown as string;
const GITHUB_OAUTH_CLIENT_SECRET = process.env
  .GITHUB_OAUTH_CLIENT_SECRET as unknown as string;

type GitHubOauthToken = {
  access_token: string;
};

export const getGithubOathToken = async ({
  code,
}: {
  code: string;
}): Promise<GitHubOauthToken> => {
  // console.log(code);
  const rootUrl = "https://github.com/login/oauth/access_token";
  const body = {
    client_id: GITHUB_OAUTH_CLIENT_ID,
    client_secret: GITHUB_OAUTH_CLIENT_SECRET,
    code,
  };

  const options = { headers: { accept: "application/json" } };

  // console.log("Request Body:", body);
  // console.log("Request Options:", options);

  try {
    const response = await axios.post(rootUrl, body, options);

    // console.log("access_token:", response.data);
    const access_token = response.data as GitHubOauthToken;

    return access_token;
  } catch (err: any) {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(err)) {
      // Handle Axios-specific error
      const errorMessage = err.response?.data?.message || err.message;
      const statusCode = err.response?.status || 500;
      throw new Error(
        `GitHub OAuth API error (${statusCode}): ${errorMessage}`
      );
    } else {
      // Handle non-Axios error
      throw new Error(`An unexpected error occurred: ${err.message || err}`);
    }
  }
};

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

export const getGithubUser = async ({
  access_token,
}: {
  access_token: string;
}): Promise<GitHubUser> => {
  try {
    const { data } = await axios.get<GitHubUser>(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  } catch (err: any) {
    throw Error(err);
  }
};
