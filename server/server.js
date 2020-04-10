require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

/*mongoose.connect('mongodb://localhost/cafe', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('La BBDD está online'))
    .catch(console.log);*/

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('La BBDD está online.');
});

app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));