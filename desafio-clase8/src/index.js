const express = require('express');
const logRequestInfo = require('./middlewares/logRequestInfo');

const productRouter = require('./router/products');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.use('/api/products', logRequestInfo, productRouter);

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

