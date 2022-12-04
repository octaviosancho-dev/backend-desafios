const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');

const Container = require('./controller/container')
const { optionsMariaDB, optionsSQLite3 } = require('./config/config')

const { logRequestInfo } = require('./middlewares/logRequestInfo');
const { productRouter } = require('./routes/productRouter.js');

const PORT = process.env.PORT || 8080;
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/', logRequestInfo, productRouter);

const products = new Container('products', optionsMariaDB);
const messages = new Container('mensajes', optionsSQLite3);

io.on('connection', async socket => {
  const getProducts = await products.getAll();
	io.sockets.emit('products', getProducts);
  
  socket.on('newProduct', async newProduct => {
    products.save(newProduct);
    const getProducts = await products.getAll();
    io.sockets.emit('products', getProducts);
  });

  const getMessages = await messages.getAll();
  io.sockets.emit('messages', getMessages);

	socket.on('newMessage', async newMessage => {
    messages.save(newMessage);
    const getMessages = await messages.getAll();
    io.sockets.emit('messages', getMessages);
  })
});

const server = httpserver.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
);

server.on('error', () => console.log(`Error: ${err}`));