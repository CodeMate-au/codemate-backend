"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_service_1 = require("../services/github.service");
const prisma_1 = __importDefault(require("../prisma"));
const jwt_service_1 = require("../services/jwt.service");
const githubLoginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        scope: "read:user",
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
    };
    // Convert parameters to a URL-encoded string
    const urlEncodedParams = new URLSearchParams(params).toString();
    res.redirect(`https://github.com/login/oauth/authorize?${urlEncodedParams}`);
});
const githubRedirectHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.query;
        // console.log("github code:", code);
        // Check if the code is present
        if (!code || typeof code !== "string") {
            return res
                .status(400)
                .json({ error: "Missing Github Code required for authentication" });
        }
        const githubaccessToken = yield (0, github_service_1.getGithubOathToken)({ code });
        // console.dir(githubaccessToken);
        const githubUser = yield (0, github_service_1.getGithubUser)({
            access_token: githubaccessToken.access_token,
        });
        // console.log("githubUser:", githubUser);
        let user = yield prisma_1.default.user.upsert({
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
        const token = (0, jwt_service_1.createToken)(user.id);
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
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: err });
            res.status(500).json({ error: "Something went wrong" });
        }
    }
});
exports.default = { githubRedirectHandler, githubLoginHandler };
