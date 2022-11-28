const Container = require('./container');

const carts = new Container('./data/carts.json')

// Create Cart
const addCart = async (req, res) => {
  const { products } = req.body;
  
  try {
    carts.addItem({products});
    const cartList = await carts.getAll();
    const cartID = cartList.length;
    
    res.status(200).json({ message: `Nuevo Carrito Generado! ID: ${cartID}` });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get all Cart Products
const getCartProducts = async (req, res) => {
  try {
    const cartID = Number(req.params.id);
    const cart = await carts.getById(cartID);
    const cartProductList = cart.products;

    return res.status(200).send(cartProductList);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteCart = async (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || id > carts.objects.length || isNaN(id)) res.status(400).send({ message: 'Ingresa el ID de un carrito existente' });

  carts.deleteById(id);
  console.log(id);
  res.status(200).json({ message: `Carrito ${id} eliminado!` });
}

// Add Products to a Cart
const addProduct = (req, res) => {
  const { id_prod } = req.body;
  
  try {
    const cartID = Number(req.params.id);
    carts.addProductToCart(cartID, id_prod);

    res.status(200).json({ message: 'Producto Añadido al Carrito!' });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete Product from a Cart
const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const idProd = Number(req.params.id_prod);
  if (id < 0 || id > carts.objects.length || isNaN(id)) res.status(400).send({ message: 'Ingresa el ID de un carrito existente' });
  if (idProd < 0 || idProd > carts.objects.length || isNaN(idProd)) res.status(400).send({ message: 'Ingresa el ID de un producto listado' });

  carts.deleteProductFromCart(id, idProd);
  res.status(200).json({ message: `Producto ${idProd} eliminado!` });
}

module.exports = {
  addCart,
  getCartProducts,
  deleteCart,
  addProduct,
  deleteProduct
}