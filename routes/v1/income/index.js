import {Router} from "express";
import salary from "./salary/index.js";

const router = Router();

router.use("/salary", salary)

export default router;
