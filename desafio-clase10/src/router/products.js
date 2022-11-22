const { Router } = require('express');
const productRouter = Router();


let products = [];

productRouter.get('/', (req, res) => res.render('products', { products }));

productRouter.get('/products', (req, res) => res.render('productForm'));

productRouter.post('/products', (req, res) => {
	const { title, price, thumbnail } = req.body;
  if (title && price && thumbnail) products.push({ title, price, thumbnail });
	res.render('productForm');
});

module.exports = productRouter;