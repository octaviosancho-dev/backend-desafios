const { optionsSQLite3 } = require('../config/config');

const knexSQLite3 = require('knex')(optionsSQLite3);

knexSQLite3.schema.createTable('mensajes', table => {
  table.increments('id')
  table.string('email')
  table.string('message')
  table.string('date')
})
  .then( () => console.log('Table Created') )
  .catch( err => { console.log(err); throw err } )
  .finally( () => knexSQLite3.destroy() )