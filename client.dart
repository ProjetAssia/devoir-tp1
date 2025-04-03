import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

//  Fonction pour récupérer tous les produits
Future<void> getProducts(String baseUrl) async {
  final response = await http.get(Uri.parse('$baseUrl/products'));

  if (response.statusCode == 200) {
    List<dynamic> products = jsonDecode(response.body);
    print(' Produits disponibles:');
    for (var product in products) {
      print('Nom: ${product['name']}, Prix: ${product['price']}');
    }
  } else {
    print(' Erreur lors de la récupération des produits');
  }
}

//  Fonction pour ajouter un nouveau produit
Future<void> addProduct(String baseUrl, Map<String, dynamic> product) async {
  final response = await http.post(
    Uri.parse('$baseUrl/products'),
    headers: {HttpHeaders.contentTypeHeader: 'application/json'},
    body: jsonEncode(product),
  );

  if (response.statusCode == 201) {
    print(' Produit ajouté avec succès');
  } else {
    print(' Erreur lors de l\'ajout du produit');
  }
}

//  Fonction pour récupérer toutes les commandes
Future<void> getOrders(String baseUrl) async {
  final response = await http.get(Uri.parse('$baseUrl/orders'));

  if (response.statusCode == 200) {
    List<dynamic> orders = jsonDecode(response.body);
    print(' Commandes disponibles:');
    for (var order in orders) {
      print('Produit: ${order['product']}, Quantité: ${order['quantity']}');
    }
  } else {
    print(' Erreur lors de la récupération des commandes');
  }
}

//  Fonction pour ajouter une nouvelle commande
Future<void> addOrder(String baseUrl, Map<String, dynamic> order) async {
  final response = await http.post(
    Uri.parse('$baseUrl/orders'),
    headers: {HttpHeaders.contentTypeHeader: 'application/json'},
    body: jsonEncode(order),
  );

  if (response.statusCode == 201) {
    print(' Commande créée avec succès');
  } else {
    print(' Erreur lors de la création de la commande');
  }
}

//  Tester toutes les fonctionnalités
void main() async {
  final String baseUrl = 'http://localhost:3000';

  await getProducts(baseUrl);

  final newProduct = {'name': 'Produit C', 'price': 200};
  await addProduct(baseUrl, newProduct);

  await getOrders(baseUrl);

  final newOrder = {'product': 'Produit C', 'quantity': 3};
  await addOrder(baseUrl, newOrder);
}
