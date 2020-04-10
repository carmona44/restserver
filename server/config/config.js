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
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;