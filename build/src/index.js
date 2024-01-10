"use strict";
// import { PrismaClient } from "@prisma/client";
// import express from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_form_data_1 = __importDefault(require("express-form-data"));
exports.app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions = {
    origin: "http://localhost:3000", // or the specific origin you want to allow
    credentials: true, // to allow cookies to be sent
    optionsSuccessStatus: 200,
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_form_data_1.default.parse());
const problem_route_1 = __importDefault(require("./routes/problem.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const room_route_1 = __importDefault(require("./routes/room.route"));
const member_route_1 = __importDefault(require("./routes/member.route"));
exports.app.use(express_1.default.json());
exports.app.use("/api/problems", problem_route_1.default);
exports.app.use("/api/auth", auth_route_1.default);
exports.app.use("/api/user", user_route_1.default);
exports.app.use("/api/room", room_route_1.default);
exports.app.use("/api/members", member_route_1.default);
