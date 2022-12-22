let admin = require("firebase-admin");

let serviceAccount = require("../data/ecommerce-backend-1dd9c-firebase-adminsdk-3defu-967b5d380f.json");

const connectFirebaseDB = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Conexion a la base de datos FIREBASE exitosa!');
}

module.exports = connectFirebaseDB;