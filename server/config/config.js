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

// ==================================
// ============== JWT ===============
// ==================================

process.env.CADUCIDAD_TOKEN = "30d";
process.env.SECRET = process.env.SECRET || 'secret-rest-server-desarrollo';

// ==================================
// ========= GOOGLE CLIENT ==========
// ==================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '526559352683-tu7s3eteieuu00f9kup82d9tsn6nouae.apps.googleusercontent.com';