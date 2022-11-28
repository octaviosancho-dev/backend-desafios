const Container = require('./container');

const products = new Container('./data/products.json')

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const productList = await products.getAll();
    return res.status(200).send(productList);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  try{
    const id = Number(req.params.id);
    const product = await products.getById(id);
    if (!product) return res.status(404).send({ message: `El ID ${id} no pertenece a ningun producto listado` });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Create Product
const addProduct = (req, res) => {
  const { name, description, code, image, price, stock } = req.body;
  
  try {
    products.addItem( { name, description, code, image, price, stock } );
    res.status(200).json({ message: 'Producto Agregado!' });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Update Product
const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || id > products.objects.length || isNaN(id)) res.status(400).send({ message: 'Ingresa el ID de un producto listado' });

  products.updateItem(id, req.body);
  res.status(200).json({ message: `Producto ${id} actualizado!` });
}

// Delete Product
const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || id > products.objects.length || isNaN(id)) res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
  products.deleteById(id);
  res.status(200).json({ message: `Producto ${id} eliminado!` });
}

module.exports = {
  products,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
}