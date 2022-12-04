//* Clase Contenedora, persistencia de productos y carrito en File System

const knex = require('knex');

class Container {
  constructor(tableName, config) {
    this.tableName = tableName;
    this.config = config;
    this.knex = knex(this.config);
  }

  // CREATE
  async save(obj) {
    this.knex(this.tableName).insert(obj)
      .then(() => console.log('Saved'))
      .catch(err => { console.log(err); throw err })
  }

  // UPDATE
  async updateItem(obj) {
    try {
      this.knex.from(this.tableName).update(obj).update();
      return { message: 'Item actualizado!' }
    } catch (err) {
      throw err;
    }
  }
  
  // GET ITEM
  async getById(id) {
    try {
      let obj = this.knex.from(this.tableName).select().table(this.tableName).where('id', id).first();
      return obj ? obj : null;
    } catch (err) {
      throw err
    }
  }

  // GET ALL ITEMS
  async getAll() {
    try {
      let objs = await this.knex.from(this.tableName).select('*')
      return objs;
    } catch (err) {
      return err;
    }
  }

  // DELETE ITEM
  async deleteById(id) {
    try {
      this.knex.from(this.tableName).where('id', '=', id).del();
      return { message: 'Item eliminado!' }
    } catch (err) {
      throw err
    }
  }

  // DELETE ALL ITEMS
  async deleteAll() {
    try {
      this.knex.from(this.tableName).del();
      return { message: 'Todos los items eliminados!' }
    } catch (err) {
      throw err
    }
  }

  // // ADD ITEM TO CART
  // async addProductToCart(id, idProd) {
  //   const selectedCart = await this.getById(id);
  //   const selectedProduct = availableProducts.find( product => product.id === idProd );

  //   if (selectedCart && selectedProduct) {
  //     selectedCart.products.push(selectedProduct);
  //     this.writeData(this.objects);
  //   }
  // }

  // // DELETE ITEM FROM CART
  // async deleteProductFromCart(id, idProd) {
  //   const selectedCart = await this.getById(id);
  //   const selectedProduct = availableProducts.find( product => product.id === idProd );

  //   if (selectedCart && selectedProduct) {
  //     const newProductList = selectedCart.products.filter( product => product.id !== idProd );
  //     selectedCart.products = newProductList;
  //     this.writeData(this.objects);
  //   }
  // }
}

module.exports = Container;