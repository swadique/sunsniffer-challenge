import express from "express";
import { vaccineSummery } from "../controller";
import validatorMiddleware from "../middleware/validator.middleware";
import { vaccineSummeryValidator } from "../validators/vaccine.validator";

const router = express.Router();

router.get(
  "/vaccine-summary",
  ...vaccineSummeryValidator,
  validatorMiddleware,
  vaccineSummery
);

export default router;
