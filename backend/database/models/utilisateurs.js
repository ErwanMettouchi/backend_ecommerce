const mongoose = require('mongoose');

const utilisateurSchema = mongoose.Schema({
    prenom : { type: String, required: true },
    nom : String,
    email : { type : String, required : true, unique : true },
    motDePasse : { type: String, required: true },
    telephone : { type : Number, required : true, unique : true },
    role : String,
    adresse : { type : String, required : true }
    });

const Utilisateurs = mongoose.model('utilisateurs', utilisateurSchema);

module.exports = Utilisateurs;