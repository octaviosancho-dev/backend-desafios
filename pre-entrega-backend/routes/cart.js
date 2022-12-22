const router = require('express').Router();
const isAdmin = require('../middlewares/auth');

const { addCart, deleteCart, getProducts, addProduct, deleteProduct } = require('../controllers/cartControllerMongoDB');

// Create
router.post('/', isAdmin, (req, res) => addCart(req, res) );

// Delete Product from a Cart
router.delete('/:id', (req, res) => deleteCart(req, res) );

// Get All Cart Products
router.get('/:id/products', isAdmin, (req, res) => getProducts(req, res) );

// Add Products to a Cart
router.post('/:id/products', isAdmin, (req, res) => addProduct(req, res) );

// Delete Product from a Cart
router.delete('/:id/products/:id_prod', (req, res) => deleteProduct(req, res) );


module.exports = router;