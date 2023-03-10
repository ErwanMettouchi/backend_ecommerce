var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Utilisateur = require('../database/models/utilisateurs');
const Produits = require('../database/models/produits');
const Marques = require('../database/models/marques');
const SousCategories = require('../database/models/sousCategories')

router.get('/login', (req, res) => {
    if (req.session.admin === undefined) {
        req.session.admin = [];
    }

    res.render("connexion-admin")
})

router.post('/login', async (req, res) => {
    
    let erreurAuthentificationAdmin = [];
    const admin = await Utilisateur.findOne({
        email: req.body.email,
        role: "admin",
    });
    
    
    if (!admin) {
        erreurAuthentificationAdmin.push('Une erreur est survenue, veuillez réessayer');
        return res.render('connexion-admin', { erreurs: erreurAuthentificationAdmin, panier: req.session.cart })
    }
    
    let validPassword = await bcrypt.compare(req.body.motDePasse, admin.motDePasse);
    
    if (validPassword) {
        req.session.admin.push({
            id: admin.id,
        })
        return res.status(200).redirect('/admin/insert-products');
    } else {
        erreurAuthentificationAdmin.push('Une erreur est survenue, veuillez réessayer');
        return res.render('connexion-admin', { erreurs: erreurAuthentificationAdmin })
    }
})

router.get('/insert-products', async (req, res) => {
    if (req.session.admin === undefined) {
        req.session.admin = [];
    }
    if (req.session.admin.length === 0) {
        return res.redirect('/admin/login')
    }
    const marque = await Marques.find()
    const sousCategorie = await SousCategories.find()

    res.render('admin-products', { marque, sousCategorie });
})

router.post('/insert-product', async (req, res) => {
    const marque = await Marques.find()
    const sousCategorie = await SousCategories.find()

    const newProduct = new Produits({
        nom: req.body.nomProduit,
        description: req.body.description,
        prix: req.body.prix,
        stock: req.body.stock,
        sousCategorie: req.body.souscategorie,
        marque: req.body.marque,
        image: req.body.image
    })
    await newProduct.save();
    res.render('admin-products', { marque, sousCategorie});
})

router.get('/delete-product', async (req, res) => {
    const produit = await Produits.find();
    res.render('delete-product', { produit });
})

module.exports = router;