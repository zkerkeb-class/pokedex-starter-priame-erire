Répertoire GitHub de Pierre-Marie Vermersch 

|  1) Description du projet |
|---------------------------|

Le projet est une application web qui gère une collection de pokémon. L’accès à cette collection exige une connexion à un compte qui peut être créer in situ. 
L’ensemble du projet est développé en React en utilisant Node JS. La base de données utilisée est MongoDB. Elle est de type NoSQL.

L’auteur de ce projet est Pierre-Marie Vermersch avec assistance de l’intelligence artificielle générative.
Sur ce projet, nous vous proposons de nombreuses fonctionnalité pratiques pour rendre l’expérience utilisateur la plus optimale et pratique.

L’utilisateur peut d’abord voir les caractéristiques d’un pokémon en sélectionnant ou en le choisissant au hasard. Des fonctionnalités de filtrage par type et de recherche par nom permettent à l’utilisateur d’affiner sa recherche de pokémons.
Puis, il peut aussi ajouter, modifier, supprimer un pokémon. L’ensemble de ces actions sont réalisables directement sur 
l’interface utilisateur. Une confirmation sera demandée à l’utilisateur en cas de suppression d’un pokémon pour prévenir des risques de suppression malencontreuse.

L’utilisateur qui crée un compte sur la plateforme doit se conformer à des règles strictes de sécurité sur son mot de passe. Celui-ci doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial. Tout utilisateur contrevenant à cette règle ne pourra pas créer un compte.

Bien que l’interface se veut intuitive et pratique, des optimisations et améliorations peuvent être envisagées. Pour toutes questions, n’hésitez pas à nous contacter directement. Soyez assuré de notre dévouement à votre service.


|  2) Instructions d'installation |
|---------------------------------|


Afin d’utiliser ce projet il est nécessaire de s’assurer de conformités avec les différents prérequis que nous allons décrire dans cette section. 

Il est indispensable d’installer un environnement de développement web (IDE) de préférence l’application Visual Studio Code. 

De plus, il faut également installer l’environnement MongoDB pour la base de données. 
L’utilisation de l’outil de visualisation de la base de données NoSQL, MongoDB Compass est indispensable.

Une fois ces outils installés, vous devez configurer les différents outils de la façon suivante.

Comme vous ne vous en doutez sans doute pas, le projet se découpe en deux parties : frontend et backend. Il faut disposer de ces deux parties pour faire fonctionner le projet.

Ainsi, il faut télécharger le frontend et le backend. 
-	Le frontend est disponible à l’adresse URL suivante : https://github.com/zkerkeb-class/pokedex-starter-priame-erire
-	Le backend est disponible à l’adresse URL suivante : https://github.com/zkerkeb-class/pokedex-api-priame-erire

Ensuite, il faut les ouvrir ensuite dans Visual Studio dans deux pages distinctes. En effet, les deux parties se lancerons de façons distinctes. Le frontend se lancera sur le port 5173 et le backend sur le port 3000.

Après cela, il faut configurer la base de données. En premier lieu, il faut vérifier que MongoDB est activé et en cours d’exécution dans l’application système « Services » de Microsoft Windows. Il suffit de cliquer sur Démarrer après avoir sélectionné le service « MongoDB Server ».

Puis, il faut configurer MongoDB Compass et le configurer tel que décrit dans le fichier « .env » du backend. Il faut intégrer les deux exports de la base de données de MongoDB Compass (https://github.com/zkerkeb-class/pokedex-api-priame-erire/tree/main/export_database). Le premier correspond à la base de données pokémons et le deuxième à la base de données des utilisateurs.

NB : Il faut souvent penser à redémarrer MongoDB via l’application système « Services » de Microsoft Windows si le statut du service est arrêté.  C’est typiquement le cas quand MongoDB Compass n’arrive pas à se connecter à la base de données et que l’on obtient des erreurs 500. C’est une cause d’erreur fréquente dans ce projet. Nous vous recommandons de vérifier systématiquement que le backend est bien connecté à MongoDB.
Une fois toutes ces étapes réalisées, il ne reste plus qu’à lancer le projet en ouvrant un terminal dans Visual Studio code : ```javascript npm run dev » ```.

|  3) Documentation de l'API      |
|---------------------------------|

Passons maintenant à des considérations plus techniques sur l’API. 

Le frontend est connecté à deux API toutes les deux reliées au port 300.

Le fichier Index.js définit les deux ensembles de routes : /api/pokemons et /api/auth.

Deux routeurs (ensemble de routes) sont créés dans le dossier routes. La première pokemonRoutes.js gèrent l’ensemble des requêtes http à la base de données sur la gestion des pokémons. La deuxième auth.js gèrent l’ensemble des requêtes http à la base de données sur la gestion des utilisateurs et des tokens.

La route users est une extension envisagée non finalisé visant à créer des routes spécifiques pour les administrateurs. Service gère les requêtes http et les rends au frontend.

Le dossier Models contient deux fichiers Pokemon.js et User.js décrivant les caractéristiques que doivent posséder un pokémon et un utilisateur.
Le fichier db.js dans le dossier config assure la bonne connexion à la base de données.



|  4) Lien vers la vidéo de démonstration YouTube |
|-------------------------------------------------|

Enfin, voici le lien de la vidéo de démonstration du programme dans son ensemble https://youtu.be/FUogKaaBQmo  tel qu’il fonctionne dans sa totalité.
