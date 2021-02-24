import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
import { mercadopagoPay } from '../controllers/mercadopagoController.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/pay/mercadopago').post(protect, mercadopagoPay)


export default router