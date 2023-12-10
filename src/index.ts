// import { PrismaClient } from "@prisma/client";
// import express from "express";

// const prisma = new PrismaClient();
// const app = express();

// app.use(express.json());

// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.post("/register", async (req, res) => {
//   const result = await prisma.user.create({
//     data: {
//       ...req.body,
//     },
//   });
//   res.json(result);
// });

// app.get("/login", async (req, res) => {});
// app.listen(3000, () =>
//   console.log("REST API server ready at: http://localhost:3000")
// );
import express from "express";
import cors from "cors";
export const app = express();

import cookieParser from "cookie-parser";
const corsOptions = {
  origin: "http://localhost:3000", // or the specific origin you want to allow
  credentials: true, // to allow cookies to be sent
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

import problemRouter from "./routes/problem.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
app.use(express.json());
app.use("/api/problems", problemRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
