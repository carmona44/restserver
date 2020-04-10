// ==================================
// ============= PORT ===============
// ==================================

process.env.PORT = process.env.PORT || 3000;

// ==================================
// ============ Entorno =============
// ==================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==================================
// ============ URL BBDD ============
// ==================================

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cafe';
} else {
    urlDB = 'mongodb+srv://carmona44:2duIa5R55GFbSst3@cluster0-ilb3t.mongodb.net/cafe';
}

process.env.URLDB = urlDB;