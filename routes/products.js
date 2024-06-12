const express = require('express');
const router = express.Router();
const { getProduct, getProductStatic} = require('../controllers/products.js');

router.route('/').get(getProduct);
router.route('/static').get(getProductStatic);

module.exports = router;
