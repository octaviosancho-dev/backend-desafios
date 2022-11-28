const router = require('express').Router();
const isAdmin = require('../middlewares/auth');

const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Create - solo para administradores
router.post('/', isAdmin, (req, res) => addProduct(req, res) );

// Update - solo para administradores
router.put('/:id', isAdmin, async (req, res) => updateProduct(req, res) );

// Delete - solo para administradores
router.delete('/:id', isAdmin, async (req, res) => deleteProduct(req, res) );

// Get Product
router.get('/:id', async (req, res) => getProductById(req, res) );

// Get All Products
router.get('/', async (req, res) => getAllProducts(req, res) );


module.exports = router;