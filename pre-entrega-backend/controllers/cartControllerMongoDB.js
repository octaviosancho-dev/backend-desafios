const Carts = require('../containers/containerCartsMongoDB');

const carts = new Carts();

const addCart = async (req, res) => {
  await carts.save(req.body);
  res.json({ message: 'Carrito agregado!' });
}

const deleteCart = async (req, res) => {
  await carts.getByID(req.params.id);
  res.json({ message: 'Carrito eliminado!' });
}

const getProducts = async (req, res) => {
  const cartProducts = await carts.getCartProducts(req.params.id);
  res.send(cartProducts);
}

const addProduct = async (req, res) => {
  await carts.saveProduct(req.params.id_prod, req.params.id);
  res.json({ message: 'Producto agregado al carrito!' })
}

const deleteProduct = async (req, res) => {
  await carts.deleteProduct(req.params.id_prod, req.params.id)
  res.json({ message: 'Producto eliminado de carrito!' })
}


module.exports = { addCart, deleteCart, getProducts, addProduct, deleteProduct }