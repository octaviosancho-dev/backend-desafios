const mongoose = require('mongoose');

class Container {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  // SAVE ITEM
  save(obj) {
    try {
      return this.model.create(obj);
    } catch (err) {
      console.log(err);
    }
  }
  
  // GET ITEM
  getByID(id) {
    try {
      return this.model.findById(id);
    } catch(err) {
      console.log(err);
    }
  }

  // GET ALL ITEMS
  getAll() {
    try {
      return this.model.find();
    } catch (err) {
      console.log(err);
    }
  }

  // DELETE ITEM
  deleteByID(id) {
    try {
      return this.model.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = Container;