require('dotenv').config();

let express = require('express');
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser');
let socket = require('socket.io');

let feedRoute = require('./routes/feed');

const PORT = process.env.PORT || 4040;

app.use(cors());

app.use(bodyParser.json());

// Log request details to console
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

app.use(feedRoute);

// Handler for 404
app.use((req, res, next) => {
  res.status(404).send('404');
});

// Handler for 500
app.use((err, req, res, next) => {
  console.error(err, stack);
  res.status(500).send('500');
});

let server = app.listen(PORT, () =>
  console.info(`Server has started on ${PORT}`)
);

// Socket setup
let io = socket(server);

io.on('connection', client => {
  console.log('Made socket connection', client.id);

  client.on('calculation', () => {
    client.broadcast.emit('calculation');
    io.sockets.emit('calculation');
  });
});
