const mongoose = require('mongoose');

const utilisateurSchema = mongoose.Schema({
    prenom: { type: String, required: true },
    nom: String,
    email: { type: String, required: true, unique: true },
    pseudo : {type : String, required : true , unique : true, minLength : 5, maxLength : 15},
    motDePasse: { type: String, required: true },
    telephone: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true, default: false },
    adresse: { type: String, required: true }
});

const Utilisateurs = mongoose.model('utilisateurs', utilisateurSchema);

module.exports = Utilisateurs;