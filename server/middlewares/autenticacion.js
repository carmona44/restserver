const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
};

let verificaRol = (req, res, next) => {
    let rol = req.usuario.role;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

    next();
};

module.exports = {
    verificaToken,
    verificaRol
}