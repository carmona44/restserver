const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ state: true })
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ state: true }, (err, totalUsuarios) => {
                res.status(200).json({
                    ok: true,
                    totalUsuarios,
                    usuariosMostrados: usuarios.length,
                    usuarios
                });
            });

        });
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    // El trozo de código comentado es por si se quisiera borrar el usuario por completo de la BBDD

    /*Usuario.findByIdAndRemove(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se ha encontrado al usuario.'
                }
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Usuario borrado de la BBDD correctamente.',
            usuario
        });
    });*/

    let cambioEstado = {
        state: false
    };

    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

module.exports = app;