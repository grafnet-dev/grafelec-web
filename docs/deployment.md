# Déploiement production

L'application est exposée uniquement sur `127.0.0.1:3000` pour être publiée par le reverse proxy du serveur.
Nginx et HTTPS sont configurés directement sur le serveur et ne font pas partie de ce dépôt.

## Premier lancement

```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## Voir l'état

```bash
docker compose -f docker-compose.prod.yml ps
```

## Logs

```bash
docker compose -f docker-compose.prod.yml logs -f --tail=100
```

## Redémarrer

```bash
docker compose -f docker-compose.prod.yml restart
```

## Mettre à jour après un git pull

```bash
git pull
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## Arrêter

```bash
docker compose -f docker-compose.prod.yml down
```
