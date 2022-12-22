const connectFirebaseDB = require('../config/firebaseConfig')

connectFirebaseDB();

const { getFirestore } = require('firebase-admin/firestore');

class Container {
  constructor() {
    this.database = getFirestore();
  }

  // SAVE ITEM
  save(obj) {
    try {
      return this.database.collection('products').add(obj);
    } catch (err) {
      console.log(err);
    }
  }
  
  // GET ITEM
  getByID(id) {
    try {
      return this.database.collection('products').doc(id).get();
    } catch(err) {
      console.log(err);
    }
  }

  // GET ALL ITEMS
  getAll() {
    try {
      return this.database.doc('products').get();
    } catch (err) {
      console.log(err);
    }
  }

  // UPDATE ITEM
  update(id, data) {
    try {
      return this.database.collection('products').doc(id).update(data);
    } catch (err) {
      console.log(err);
    }
  }

  // DELETE ITEM
  deleteByID(id) {
    try {
      return this.database.collection('products').doc(id).delete();
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = Container;