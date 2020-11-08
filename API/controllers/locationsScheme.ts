const mongoose = require('mongoose');

const { Schema } = mongoose;


//Scheme para Mongoose del collection de Coordenadas
export const Coordenadas = mongoose.model('Coordenadas',
new Schema({ 
    guid : String,
    lat: mongoose.Decimal128,
    long: mongoose.Decimal128,
    canton: String,
    datetime: { type: Date, default: Date.now }
}));
