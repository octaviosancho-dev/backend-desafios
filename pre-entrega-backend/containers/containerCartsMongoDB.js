const mongoose = require('mongoose');
const Container = require('../containers/containerMongoDB');
const { products } = require('../controllers/productControllerMongoDB');

class Carts extends Container {
  
  constructor() {
    super('carts', mongoose.Schema(
      {
				products: [
					{
						name: { type: String, require: true },
						description: { type: String, require: true },
						code: { type: Number, require: true },
						image: { type: String, require: true },
						price: { type: Number, require: true },
						stock: { type: Number, require: true }
					},
					{ timestamps: true }
				]
			},
      { timestamps: true }
    ));
  }

  async getCartProducts(cartId) {
    return await this.model.findById(cartId).find({ products: {} }); //! No se que ocurre, pero el endpoint me devuelve un array vacio
  }

  async saveProduct(productId, cartId) {
    const product = await products.model.findById(productId);
    const cart = await this.model.findById(cartId);
    await cart.products.push(product);
    return await cart.save();
  }

  async deleteProduct(productId, cartId) {
    const cart = await this.model.findById(cartId);
    const index = await cart.products.findIndex( product => product._id === productId );
    await cart.products.splice(index, 1);
    return await cart.save();
  }
  
}

module.exports = Carts;