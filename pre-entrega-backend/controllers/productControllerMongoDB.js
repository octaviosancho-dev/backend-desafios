const Products = require('../containers/containerProductsMongoDB');

const products = new Products();

const getProducts = async (req, res) => {
  if(req.params.id === undefined) return res.json( await products.getAll() );
  
  const product = await products.getByID(req.params.id);
  console.log(product);
  
  if(!product) return res.sendStatus(404);
  res.json(product);
}

const addProduct = async (req, res) => {
  const { name, description, code, image, price, stock } = req.body;
  await products.save({ name, description, code, image, price, stock });

  res.json({ message: 'Producto agregado!' });
}

const updateProduct = async (req, res) => {
  await products.updateProduct(req.params.id, req.body)

  res.json({ message: 'Producto actualizado!' })
}

const deleteProduct = async (req, res) => {
  await products.deleteByID(req.params.id);

  res.json({ message: 'Producto eliminado!' })
}

module.exports = { products, getProducts, addProduct, updateProduct, deleteProduct };
