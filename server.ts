import dotenv from "dotenv";
dotenv.config();

import { app } from "./src/index";

const port = process.env.PORT || "3000";
app.listen(port);
