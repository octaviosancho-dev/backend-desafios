const express = require('express');
const logRequestInfo = require('./src/middlewares/logRequestInfo');

const productRouter = require('./src/router/products');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views')

app.use('/', logRequestInfo, productRouter);


app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});