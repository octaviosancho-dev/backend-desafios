const products = [
  // {
  //   id: 1,
  //   title: 'Café de Molido',
  //   price: 900,
  //   thumbnail: 'https://cursosbaristacafe.com.mx/wp-content/uploads/2020/10/cafe-molido-medio.jpg'
  // },
  // {
  //   id: 2,
  //   title: 'Maquina de Café',
  //   price: 1000,
  //   thumbnail: 'https://www.nespresso.com/ecom/medias/sys_master/public/10478102282270/Hotels-Medium-480x480-V2.png'
  // }
];

class ProductController {
  constructor () {
    this.products = products;
  }
  
  getId() {
    const lastProduct = this.products[this.products.length - 1]
    if (lastProduct) {
      const lastId = lastProduct.id;
      return lastId + 1;
    }

    return 1;
  }

  save(product) {
    product.id = this.getId();
    this.products.push(product);

    return product.id;
  }

  getById(id) {
    const product = this.products.find( item => item.id === parseInt(id) );
    
    if (!product)
      return null;
    
    return product;
  }

  getAll() {
    return this.products;
  }

  deleteById(id) {
    const productIndex = this.products.findIndex( item => item.id === parseInt(id) ) 
    this.products.splice(productIndex,1);
  }

  deleteAll() {
    this.products = [];
  }

  update(id, product) {
    const productIndex = this.products.findIndex( item => item.id === parseInt(id) ) 
    this.products.splice(productIndex, 1, {id: parseInt(id), ...product});
  }
}

module.exports = ProductController;