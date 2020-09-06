const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAllProducts);

router.get('/products/random', ProductController.getRandomProduct);

router.get('/products/:id', ProductController.getProductById);

router.post('/products', ProductController.addProduct);

router.put('/products/:id', ProductController.editProduct);

router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
