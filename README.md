# CinéDuCoin : Application web requête API
## à faire :
Guillaume : Limiter l'affichage du loader à une seule fois, même si l'utilisateur appuie plusieurs fois sur recherche\
(Refactoriser le code en plusieurs fichiers JS)

## 29/07/25
Création du logo et implémentation de celui-ci dans la page d'accueil
## 28/07/25
Réparer la map de la page InformationsPage qui ne se charge plus\
Réparer la page InformationsPage qui ne se charge pas quand on est revenu une fois à la page précédente\
Calculer les distances entre l'adresse saisie et chaque cinéma (l'afficher sur la liste des cinémas)\
Aumentation du nombre de données extraites de l'API pour la page InformationsPage
## 25/07/25
Création d'une ébauche de style en CSS\
Affichage des cinémas dans l'ordre de distance, le plus proche en premier
## 24/07/25
Création des boutons de chaque cinéma dans le périmètre\
Programmation du comportement des boutons pour qu'ils affichent les informations du cinéma séléctionné\
Refactorisation du code pour séparer les fonctions, division de la fonction searchEngine en quatres fonctions distinctes\
Mise en place du display: none/block permettant de naviguer fenêtre après fenêtre\
Mise en place de l'auto-complétion des champs de recherches\
Ajout du bouton précédent pour revenir en arrière\
Mise en place de l'écran de chargement avant l'arrivée des résultats
## 23/07/25
Mise en commun des travaux distincts sur les différentes pages de l'application\
Résolution de la mise en lien entre les deux API, dans une fonction searchEngine (avec l'aide de Vi)\
Mise en lien de la fonction searchEngine au DOM pour l'utiliser dans le navigateur\
Mise en fonction du slider qui permet à l'utilisateur de déterminer le rayon de sa recherche
## 22/07/25
Création des fonctions de base de notre application\
Création de trois différentes pages : searchPage, resultsPage et informationsPage\
Recherches pour régler un soucis d'envoyer des paramètres SQL dans l'API cinéma
## 21/07/25
Choix du thème du projet\
Recherche des APIs publiques et gratuites : https://geoservices.ign.fr/ et https://data.culture.gouv.fr/explore/dataset/etablissements-cinematographiques/. La première transforme une adresse rédigée par un utilisateur en coordonées géographiques. La deuxième indique les cinémas de France, et peut admettre un paramètre de localisation par coordonnées géographiques.\
Identification des objectifs du projet et création du répertoire (fichiers html, js et css)