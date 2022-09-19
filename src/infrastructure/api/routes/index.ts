import { Router } from "express";
import { CustomerRouter } from "./customer.route";
import { ProductRouter } from "./product.route";

export const router = Router()

router.use('/customer', CustomerRouter)
router.use('/product', ProductRouter)
