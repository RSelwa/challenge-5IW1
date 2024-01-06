# Étape de construction
FROM node:18.18-alpine as builder

# Définir le répertoire de travail
WORKDIR /home

# Copier les fichiers de configuration et les dépendances
COPY package.json yarn.lock* ./

# Installer les dépendances
RUN yarn install --production

# Copier le code source
COPY . .

# Construire l'application
RUN yarn build

# Étape finale
FROM node:18.18-alpine

# Définir le répertoire de travail
WORKDIR /home

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /home/dist ./dist
COPY package.json yarn.lock* ./

# Installer les dépendances
RUN yarn install --production

# Exposer le port
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["yarn", "start"]