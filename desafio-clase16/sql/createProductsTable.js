const { optionsMariaDB } = require('../config/config');

const knexMDB = require('knex')(optionsMariaDB);

knexMDB.schema.createTable('products', table => {
  table.increments('id')
  table.string('name')
  table.integer('price')
  table.string('thumbnail')
})
  .then( () => console.log('Table Created') )
  .catch( err => { console.log(err); throw err } )
  .finally( () => knexMDB.destroy() )