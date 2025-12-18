const express = require('express');
const { getProducts, getProduct, createProduct, getBestsellers, getTrendingProducts, getFilterOptions, getSneakerProducts, getAccessoryProducts } = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(protect, authorize('admin', 'seller'), createProduct);

router.route('/bestsellers').get(getBestsellers);
router.route('/trending').get(getTrendingProducts);

router.route('/filters').get(getFilterOptions);

router.route('/sneakers').get(getSneakerProducts);
router.route('/accessories').get(getAccessoryProducts);

router
    .route('/:id')
    .get(getProduct);

module.exports = router;
