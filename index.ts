import express from "express";
import { json } from "body-parser";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(json());
app.use(helmet());
app.use(cors());


app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
