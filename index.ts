import express from "express";
import { json } from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import config from "config";
import apiRoutes from "./routes";
import errorResponseMiddleWare from "./middleware/errors.middleware";

const app = express();
const port = config.get("PORT") || 3000;
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(json());
app.use(helmet());
app.use(cors());
app.use("/", apiRoutes);
app.use(errorResponseMiddleWare);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
