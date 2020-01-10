// El primer valor es para PRODUCCIÓN, el alternativo para DESARROLLO

module.exports = {
    port       : process.env.PORT     || 3000,
    url        : process.env.NODE_ENV  ? 'tiendapwa.herokuapp.com' : 'localhost:3000',
    db_uri     : process.env.DB_URI   || 'mongodb://localhost:27017/tiendaw'
};