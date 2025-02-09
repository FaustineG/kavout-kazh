# How to run

`git clone git@github.com:FaustineG/kavout-kazh.git`

`cd kavout-kazh`

`docker compose up -d`

# How to mettre à jour sur le raspberry sans exploser la BDD

`docker-compose build web`

# Features

## Done

- [x] Afficher la localisation actuelle du chat
- [x] Afficher l'historique des mouvements

## Todo

- [ ] Sauvegardes BDD
- [ ] Déploiement sur le raspberry

## Bugs/remontées user

- [x] Reload sur /history
- [x] tooltip qui reste au même endroit quand on scrolle
- [x] Mettre date explicite ds history
- [ ] refresh async quand on move it
- [ ] modif de l'historique à la mano
