const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const SECRET = process.env.SECRET;
const CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN;

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Correo o contraseña incorrectos.'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Correo o contraseña incorrectos.'
                }
            });
        }

        let token = jwt.sign({
            usuario
        }, SECRET, { expiresIn: CADUCIDAD_TOKEN });

        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    });

});

module.exports = app;