const { Router } = require('express');
const productRouter = Router();

const ProductController = require('../../controllers/productController')

const productController = new ProductController();

const products = productController.getAll();

// productRouter.get('/products', (req, res) => res.render('products', { products }));

productRouter.get('/', (req, res) => res.render('productForm'));

productRouter.post('/', (req, res) => {
	const { title, price, thumbnail } = req.body;
  if (title && price && thumbnail) {
    productController.save(req.body)
  } 
	res.render('productForm');
});

module.exports = {
  productController,
  productRouter
};