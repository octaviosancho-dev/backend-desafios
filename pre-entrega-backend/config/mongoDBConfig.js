const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = (cluster) => {
  return mongoose.connect(cluster)
    .then( () => console.log('Conexion a la Base de Datos MONGODB exitosa!') )
    .catch( (err) => console.log(err) );
}

module.exports = connectDB;