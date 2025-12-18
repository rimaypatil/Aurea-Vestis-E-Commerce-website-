const express = require('express');
const { createOrder, getOrderById, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createOrder);
router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);

module.exports = router;
