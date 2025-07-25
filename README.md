# Ciné du coin : Application web requête API

## à faire :
calculer les distances entre l'adresse saisie et chaque cinéma (l'afficher sur la liste des cinémas)
afficher les cinémas dans l'ordre de distance, le plus proche en premier

## 24/07/25
Création des boutons de chaque cinéma dans le périmètre\
Programmation du comportement des boutons pour qu'ils affichent les informations du cinéma séléctionné\
Refactorisation du code pour séparer les fonctions, division de la fonction searchEngine en quatres fonctions distinctes\
mise en place du display: none/block permettant de naviguer fenêtre après fenêtre\
Mise en place de l'auto-complétion des champs de recherches\
Ajout du bouton précédent pour revenir en arrière\
Mise en place de l'écran de chargement avant l'arrivée des résultats
## 23/07/25
Mise en commun des travaux distincts sur les différentes pages de l'application\
Résolution de la mise en lien entre les deux API, dans une fonction searchEngine(avec l'aide de Vi)\
connecté la fonction searchEngine au DOM pour l'utiliser dans le navigateur\
rendu fonctionnel le slider qui permet à l'utilisateur de déterminer le rayon de sa recherche
## 22/07/25
commencé à créer les fonctions de notre application\
créé trois différentes pages : searchPage, resultsPage et informationsPage\
eu un soucis pour envoyer des paramètres SQL dans l'API cinéma
## 21/07/25
choisi le thème du projet\
trouvé des APIs publiques et gratuites : https://geoservices.ign.fr/ et https://data.culture.gouv.fr/explore/dataset/etablissements-cinematographiques/. La première transforme une adresse rédigée par un utilisateur en coordonées géographiques. La deuxième indique les cinémas de France, et peut admettre un paramètre de localisation par coordonnées géographiques.
posé les bases du projet en créant un répertoire et en préparant les fichiers html, js et css