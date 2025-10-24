import {Router} from "express";
import calculator from "./calculator.js";
import SalaryCalculatorController from "../../../../controllers/V1/income/salary/calculator/salaryCalculatorController.js";

const router = Router();

router.route("/")
    .get(SalaryCalculatorController.GetAverage)

router.use("/calculator", calculator)

export default router;
