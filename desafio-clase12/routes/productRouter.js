const { Router } = require('express');
const productRouter = Router();

let products = [];

productRouter.get('/', (req, res) => res.render('form', { products }));

module.exports = {
	productRouter,
	products
};
