require('dotenv').config();

const express = require('express');
const cors = require('cors');
const config = require('./config/general');
const mongoose = require('mongoose');

mongoose.connect(config.database.uri,
   { useNewUrlParser: true }
).then(() => {
    console.log('MongoDB is connected')
}).catch(err => {
    console.log('MongoDB connection unsuccessful');
    console.log(err)
});

const app = express();

app.use(cors());

// ----------

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

app.use((req, res, next) =>{
    req.io = io;
    next();
});

// ---------

app.use(express.json()); // permite uso de json
app.use(express.urlencoded({ extended: true})); // permite o envio de arquivo
app.use('/files', express.static(config.paths.files));
app.use(require('./routes'));

server.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`))
