const { Router } = require('express');
const productRouter = Router();


productRouter.get('/', async (req, res) => res.render('form'));

module.exports = {
	productRouter
};
