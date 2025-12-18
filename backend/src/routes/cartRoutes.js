const express = require('express');
const { getCart, addToCart, removeFromCart, updateCartItemQuantity } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All cart routes are protected

router.route('/')
    .get(getCart)
    .post(addToCart);

router.route('/:productId')
    .delete(removeFromCart)
    .put(updateCartItemQuantity);

module.exports = router;
