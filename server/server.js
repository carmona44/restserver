require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT;
const URLDB = process.env.URLDB;

// ------------- MIDDLEWARES --------------------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// configuración global de rutas
app.use(require('./routes/index'));

// ----------- FIN MIDDLEWARES -------------------

mongoose.connect(URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log('La BBDD está online.');
});

app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));