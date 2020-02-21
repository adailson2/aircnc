const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const config = require('./config/config');

io.on('connection', socket => {
  console.log('Usuário conectado', socket.id);

  
  socket.on('omni', data => {
    console.log(data);
  })

});

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// req.query - Acessar query params (para filtros)
// req.params - Acessar route params (para edição, delete)
// req.body - ACessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(config.port);
