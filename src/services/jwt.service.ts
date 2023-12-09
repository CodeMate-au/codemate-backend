import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: number;
};

const JWT_SECRET = process.env.JWT_SECRET! || "secret";

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET!) as TokenPayload;
};
export const createToken = (userId: number) => {
  console.log(JWT_SECRET);
  return jwt.sign({ userId }, JWT_SECRET!, {
    expiresIn: "1hr",
  });
};
