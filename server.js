const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Charger les produits depuis le fichier JSON
const loadProducts = () => {
  const data = fs.readFileSync('products.json');
  return JSON.parse(data);
};

// Sauvegarder les produits dans le fichier JSON
const saveProducts = (products) => {
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
};

// Récupérer tous les produits
app.get('/products', (req, res) => {
  const products = loadProducts();
  res.json(products);
});

// Ajouter un nouveau produit
app.post('/products', (req, res) => {
  const products = loadProducts();
  const newProduct = req.body;
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json({ message: 'Produit ajouté avec succès' });
});

// Charger les commandes depuis le fichier JSON
const loadOrders = () => {
  const data = fs.readFileSync('orders.json');
  return JSON.parse(data);
};

// Sauvegarder les commandes dans le fichier JSON
const saveOrders = (orders) => {
  fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
};

// Récupérer toutes les commandes
app.get('/orders', (req, res) => {
  const orders = loadOrders();
  res.json(orders);
});

// Ajouter une nouvelle commande
app.post('/orders', (req, res) => {
  const orders = loadOrders();
  const newOrder = req.body;
  orders.push(newOrder);
  saveOrders(orders);
  res.status(201).json({ message: 'Commande créée avec succès' });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
