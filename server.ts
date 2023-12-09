import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { app } from "./src/index";

app.use(cors({ credentials: true, origin: true }));
const port = process.env.PORT || "3000";
app.listen(port);
