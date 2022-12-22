const router = require('express').Router();
const isAdmin = require('../middlewares/auth');

const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productControllerMongoDB');
// const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productControllerFirebase');

// Create - solo para administradores
router.post('/', isAdmin, (req, res) => addProduct(req, res) );

// Update - solo para administradores
router.put('/:id', isAdmin, async (req, res) => updateProduct(req, res) );

// Delete - solo para administradores
router.delete('/:id', isAdmin, async (req, res) => deleteProduct(req, res) );

// Get Product
router.get('/:id', async (req, res) => getProducts(req, res) );

// Get All Products
router.get('/', async (req, res) => getProducts(req, res) );


module.exports = router;