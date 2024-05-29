import  express from 'express'
import auth from '../middleware/Auth.js'
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js'
import authMiddleware from '../middleware/Auth.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter;