const Contenedor = require('./Class.js');

const productos = new Contenedor('productos.txt');  

const test = async () => {
  await productos.save({title: "Celular2", price: 1000, thumbnail: "link imagen"});

  const productList = await productos.getAll();
  console.log(productList);

  await productos.deleteAll();

  const product = await productos.getById(1)
  console.log(product);

  await productos.deleteById(2)
  console.log(productList);
}

test();