# Social Media App
Par Pierre-Henri Luczak et Dusséaux Thomas (3ESGIAL - 2024/2025)

![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)

Une application de médias sociaux moderne avec mode sombre, réactions aux posts, et partage d'images.

## 📋 Sommaire

- [Fonctionnalités](#-fonctionnalités)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Démarrage](#-démarrage)
- [Structure du projet](#-structure-du-projet)

## ✨ Fonctionnalités

- 🔐 Authentification (inscription/connexion)
- 📝 Publication de messages texte
- 🖼️ Partage d'images
- 👍 Réactions aux posts (like, dislike, love)
- 📄 Pagination des publications
- 🌓 Thème clair/sombre
- 📱 Interface responsive

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/social-media-app.git
cd social-media-app

# Installer les dépendances backend
cd backend
npm install

# Installer les dépendances frontend
cd ../frontend
npm install
```

## ⚙️ Configuration

Créez un fichier .env dans le dossier backend:
```
PORT=3000
JWT_SECRET=votre_secret_jwt
DB_USERNAME=postgres
DB_PASSWORD=votremdp
DB_DATABASE=social_app
DB_HOST=localhost
```
Créez un fichier .env dans le dossier frontend:
```
VITE_REACT_APP_URL_BACKEND=http://localhost:3000
```

## 🏁 Démarrage

Backend
Le serveur backend démarrera sur http://localhost:3000
```
cd backend
node server.js
```

Frontend
L'application frontend sera accessible à http://localhost:5173
```
cd frontend
npm run dev
```

## 📁 Structure du projet
```
├── backend/            # API Node.js et Express
│   ├── controller/     # Contrôleurs API
│   ├── images/         # Images téléchargées
│   ├── model/          # Modèles de données
│   ├── routes/         # Routes API
│   └── server.js       # Point d'entrée
│
└── frontend/           # Application React (Vite)
    ├── public/         # Ressources statiques
    └── src/            # Code source
        ├── Component/  # Composants UI
        ├── Page/       # Pages de l'application
        └── utils/      # Utilitaires et hooks
```
