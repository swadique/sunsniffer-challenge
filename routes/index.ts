import express from "express";
import { vaccineSummery } from "../controller";
import errorResponseMiddleWare from "../middleware/errors.middleware";

const router = express.Router();

router.get("/vaccine-summary", vaccineSummery, errorResponseMiddleWare);

export default router;
