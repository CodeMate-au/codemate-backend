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
exports.getGithubUser = exports.getGithubOathToken = void 0;
const axios_1 = __importDefault(require("axios"));
const GITHUB_OAUTH_CLIENT_ID = process.env
    .GITHUB_OAUTH_CLIENT_ID;
const GITHUB_OAUTH_CLIENT_SECRET = process.env
    .GITHUB_OAUTH_CLIENT_SECRET;
const getGithubOathToken = ({ code, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
        const response = yield axios_1.default.post(rootUrl, body, options);
        // console.log("access_token:", response.data);
        const access_token = response.data;
        return access_token;
    }
    catch (err) {
        // Check if the error is an AxiosError
        if (axios_1.default.isAxiosError(err)) {
            // Handle Axios-specific error
            const errorMessage = ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || err.message;
            const statusCode = ((_c = err.response) === null || _c === void 0 ? void 0 : _c.status) || 500;
            throw new Error(`GitHub OAuth API error (${statusCode}): ${errorMessage}`);
        }
        else {
            // Handle non-Axios error
            throw new Error(`An unexpected error occurred: ${err.message || err}`);
        }
    }
});
exports.getGithubOathToken = getGithubOathToken;
const getGithubUser = ({ access_token, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return data;
    }
    catch (err) {
        throw Error(err);
    }
});
exports.getGithubUser = getGithubUser;
