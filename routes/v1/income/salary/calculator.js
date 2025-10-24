import {Router} from 'express';
import SalaryCalculatorController from "../../../../controllers/v1/income/salary/calculator/salaryCalculatorController.js"

const router = Router();

router.post("/", SalaryCalculatorController.NewSalary);
router.get("/", SalaryCalculatorController.GetSalary);
router.get("/:id", SalaryCalculatorController.GetSalary);
router.patch("/:id", SalaryCalculatorController.UpdateSalary);

router.post("/:id/records", SalaryCalculatorController.NewSalaryRecord);

export default router;
