const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
dotenv.config();

const { init: initDb } = require('./models');
const path = require('path');
const helpers = require('./views/helpers');

const product = require('./endpoints'); // Imports routes for the products
const app = express();

initDb();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', product);

app.set('view engine', 'hbs');
app.engine(
	'hbs',
	exphbs({
		extname: 'hbs',
		layoutsDir: path.join(__dirname, 'views', 'layouts'),
		partialsDir: path.join(__dirname, 'views', 'partials'),
		defaultLayout: 'main',
		helpers: helpers
	})
);
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
	console.log('Server is up and running on port numner 3000');
});
