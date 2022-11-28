//* Clase Contenedora, persistencia de productos y carrito en File System

const fs = require('fs');
const availableProducts = require('../data/products.json') 

class Container {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.objects = this.readData(this.nombreArchivo) || [];
  }

  readData(path) {
    const data = fs.readFileSync(path, 'utf-8').toString();
    if(data === '') return [];
    return JSON.parse(data);
  }
  
  writeData(objects) {
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(objects, null, 2));
  }
  

  // CREATE
  async addItem(obj) {
    try {
      const file = await this.getAll();

      if (file) this.objects = file;

      obj.id = await this.generateId();
      obj.timestamp = Date.now();
      this.objects.push(obj);
      this.writeData(this.objects);
      return obj.id;

    } catch (err) {
      throw err;
    }
  }

  // UPDATE
  async updateItem(id, data) {
    try {
      const objIndex = this.objects.findIndex(obj => obj.id === id);
      this.objects[objIndex] = { ...this.objects[objIndex], ...data };
      this.writeData(this.objects);
    } catch (err) {
      throw err;
    }
  }
  
  // GET ITEM
  async getById(id) {
    try {
      this.objects = await this.getAll();
      const obj = this.objects.find( element => element.id === parseInt(id));
      return obj ? obj : null;
    } catch (err) {
      throw err
    }
  }

  // GET ALL ITEMS
  async getAll() {
    try {
      const data = await this.readData(this.nombreArchivo);
      return data;
    }
    catch (err) {
      throw err;
    }
  }

  // DELETE ITEM
  async deleteById(id) {
    try {
      this.objects = await this.getAll();
      const obj = this.objects.filter( element => element.id !== parseInt(id) );
      this.writeData(obj);
    } catch (err) {
      throw err
    }
  }

  // DELETE ALL ITEMS
  async deleteAll() {
    try {
      this.objects = await this.getAll();
      this.objects = [];
      this.writeData(this.objects);
    } catch (err) {
      throw err
    }
  }

  // ADD ITEM TO CART
  async addProductToCart(id, idProd) {
    const selectedCart = await this.getById(id);
    const selectedProduct = availableProducts.find( product => product.id === idProd );

    if (selectedCart && selectedProduct) {
      selectedCart.products.push(selectedProduct);
      this.writeData(this.objects);
    }
  }

  // DELETE ITEM FROM CART
  async deleteProductFromCart(id, idProd) {
    const selectedCart = await this.getById(id);
    const selectedProduct = availableProducts.find( product => product.id === idProd );

    if (selectedCart && selectedProduct) {
      const newProductList = selectedCart.products.filter( product => product.id !== idProd );
      selectedCart.products = newProductList;
      this.writeData(this.objects);
    }
  }

  // GENERATE ID Helper
  async generateId() {
    try {
      this.objects = await this.getAll() || [];

      let maxId = this.objects.length;
      this.objects.forEach(el => {
        el.id > maxId ? maxId = el.id : maxId
      })

      return maxId + 1;
    } catch (err) {
      throw err
    }
  }
}

module.exports = Container;