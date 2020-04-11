const express = require('express');
const app = express();
const Categoria = require('../models/categoria');
const { verificaToken, verificaRol } = require('../middlewares/autenticacion');

// Mostrar todas las categorías
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'name email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });

});

// Mostrar una categoría
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria
        });
    });

});

// Crear una categoría
app.post('/categoria', verificaToken, (req, res) => {

    let desc = req.body.descripcion;
    let usuario = req.usuario._id;

    let categoria = new Categoria({
        descripcion: desc,
        usuario
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'La categoría se ha creado correctamente.',
            categoria: categoriaDB
        });
    });
});

// Actualizar una categoría
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let desc = req.body.descripcion;

    Categoria.findByIdAndUpdate(id, { descripcion: desc }, { new: true, runValidators: true }, (err, categoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'La categoría se ha actualizado correctamente.',
            categoria
        });
    });
});

// Borrar una categoría
app.delete('/categoria/:id', [verificaToken, verificaRol], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se ha encontrado la categoría.'
                }
            });
        }

        res.json({
            ok: true,
            message: 'La categoría se ha eliminado correctamente.',
            categoria
        });
    });
});

module.exports = app;