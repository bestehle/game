const express = require('express');
const bodyParser = require('body-parser');

const rest = require('./src/rest');

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(bodyParser.json());

rest(app);

app.listen(process.env.PORT || 3000);
