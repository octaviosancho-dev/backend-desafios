const express = require('express');
const app = express();

const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');


const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);

app.use('*', (req, res) => {
	const path = req.params;
	const method = req.method;
	res.send({ error: -2, description: `Ruta '${path[0]}' Método '${method}' no implementada` });
});


app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});