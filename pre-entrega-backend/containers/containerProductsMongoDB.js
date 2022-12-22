const mongoose = require('mongoose');
const Container = require('../containers/containerMongoDB');

class Products extends Container {

  constructor() {
    super('products', mongoose.Schema(
      {
        name: { type: String, require: true },
        description: { type: String, require: true },
        code: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        stock: { type: Number, require: true }
      },
      { timestamps: true }
    ));
  }

  updateProduct(id, data) {
    try {
      return this.model.findByIdAndUpdate(id, data);
    } catch(err) {
      console.log(err);
    }
  }
  
}

module.exports = Products;