const mongoose = require('mongoose');

const Cliente  = mongoose.model('Cliente', { nombre: String, apellidos: String });
const Articulo = mongoose.model('Articulo',{ nombre: String, precio: Number });

// --------- Otra forma más detallada
// const Cliente  = mongoose.model('Cliente', new Schema({ nombre: String, apellidos: String }));
// const Articulo = mongoose.model('Articulo',new Schema({ nombre: String, precio: Number }));

module.exports =  {
    Cliente,
    Articulo
};
