const express = require('express');
const fs = require('fs');

const app = express();
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API !');
  });
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Charger les données depuis un fichier JSON
const loadData = () => {
    return JSON.parse(fs.readFileSync('data.json', 'utf8'));
};

// Sauvegarder les données dans le fichier JSON
const saveData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
};

//  Route GET pour récupérer tous les produits
app.get('/products', (req, res) => {
    const data = loadData();
    res.json(data.products);
});

//  Route POST pour ajouter un nouveau produit
app.post('/products', (req, res) => {
    const data = loadData();
    const newProduct = req.body;
    data.products.push(newProduct);
    saveData(data);
    res.status(201).json({ message: 'Produit ajouté avec succès' });
});

//  Route GET pour récupérer toutes les commandes
app.get('/orders', (req, res) => {
    const data = loadData();
    res.json(data.orders);
});

//  Route POST pour créer une nouvelle commande
app.post('/orders', (req, res) => {
    const data = loadData();
    const newOrder = req.body;
    data.orders.push(newOrder);
    saveData(data);
    res.status(201).json({ message: 'Commande créée avec succès' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

  
  