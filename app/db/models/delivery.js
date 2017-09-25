const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
  nome: { type: String, required: true },
  peso: { type: Number, required: true },
  endereco: {
    logradouro: { type: String, required: true },
    numero: { type: Number, required: true },
    bairro: { type: String, required: true },
    complemento: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    pais: { type: String, required: true },
    geolocalizacao: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    }
  }
});

module.exports = mongoose.model('Delivery', deliverySchema);