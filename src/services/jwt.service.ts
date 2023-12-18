import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: number;
};

const JWT_SECRET = process.env.JWT_SECRET! || "secret";

export const verifyToken = (token: string) => {
  // console.log("verifyToken", token);
  try {
    return jwt.verify(token, JWT_SECRET!) as TokenPayload;
  } catch (err) {
    console.log("jwt error or expired", err);
    return err as Error;
  }
};
export const createToken = (userId: number) => {
  // console.log("jwt_secret", JWT_SECRET);

  return jwt.sign({ userId }, JWT_SECRET!, {
    expiresIn: "1hr",
  });
};
