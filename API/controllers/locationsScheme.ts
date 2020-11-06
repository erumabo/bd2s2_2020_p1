import * as mongoose from 'mongoose';

const { Schema } = mongoose;


//Scheme para Mongoose del collection de Coordenadas
export const Coordenadas = mongoose.model('Coordenadas',
new Schema({
  
    guid : String,
    lat: Float32Array,
    long: Float32Array,
    canton: String,
    datetime: { type: Date, default: Date.now }

}));