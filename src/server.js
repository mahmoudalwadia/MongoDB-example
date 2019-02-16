const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { init: initDb } = require('./models');

dotenv.config();

const product = require('./endpoints'); // Imports routes for the products
const app = express();

initDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', product);

app.listen(3000, () => {
	console.log('Server is up and running on port numner 3000');
});
