const express = require('express');
const logRequestInfo = require('./src/middlewares/logRequestInfo');

const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const fs = require('fs');

const { productRouter, productController } = require('./src/router/products');


const app = express();
const PORT = process.env.PORT || 8080;

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views')

app.use('/', logRequestInfo, productRouter);

io.on('connection', socket => {
  console.log('Nuevo Cliente conectado!');

  socket.emit('products', productController.getAll());

  io.sockets.emit('products', productController.getAll()); // Problema al refrescar
})

// Chat cliente-servidor (es la parte que me falta)




const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

connectedServer.on('error', error => console.log(`Error en servidor ${error}`));