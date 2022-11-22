const { Router } = require('express');
const ProductContainer = require('../containers/ProductContainer');

const productRouter = Router();

const productContainer = new ProductContainer();

productRouter.get('/:id', (req, res) => {
  const product = productContainer.getById(req.params.id);

  if (product === null) {
    res.json( { error: 'Producto no encontrado'} ) 
  } else {
    res.json( {product} );
  }
});

productRouter.get('/', (req, res) => {
  const products = productContainer.getAll();
  res.json({products});
});

productRouter.post('/', (req, res) => {
  console.log('POST:', req.body);
  const productId = productContainer.save(req.body);
  res.json({
    ...req.body,
    id: productId
  });
});

productRouter.put('/:id', (req, res) => {
  productContainer.update(req.params.id, req.body);
  res.json({ message: 'Producto Actualizado'});
});

productRouter.delete('/:id', (req, res) => {
  productContainer.deleteById(req.params.id);
  res.json({ message: 'Producto borrado' });
});

module.exports = productRouter;