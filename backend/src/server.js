const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

const config = require('./config/config');

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// req.query - Acessar query params (para filtros)
// req.params - Acessar route params (para edição, delete)
// req.body - ACessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(config.port);
