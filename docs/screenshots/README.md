# Captures d'écran

Ces images sont **générées automatiquement** : ne pas les modifier à la main, elles seraient écrasées.

## Liste

Numérotation dans l'ordre de lecture du site, puis fonctions annexes, puis mobile.

| Fichier | Contenu | Format |
| --- | --- | --- |
| `01-accueil.png` | Accueil avec la démonstration du terminal | 1440 × 900 |
| `02-terminal-interactif.png` | Terminal après les commandes `help` et `projects` | élément |
| `03-a-propos.png` | Section À propos | section |
| `04-competences.png` | Compétences et outils | section |
| `05-projets.png` | Projets | section |
| `06-depots-github.png` | Tableau des dépôts GitHub | section |
| `07-experience.png` | Parcours professionnel | section |
| `08-formation.png` | Formation et certifications | section |
| `09-contact.png` | Contact | section |
| `10-palette-commandes.png` | Palette de commandes (`Ctrl + K`) | 1440 × 900 |
| `11-mobile.png` | Accueil sur téléphone | 390 × 844 @2x |
| `12-mobile-menu.png` | Menu mobile ouvert | 390 × 844 @2x |

## Génération

- **Automatique** : le workflow [`screenshots.yml`](../../.github/workflows/screenshots.yml) s'exécute à chaque modification de `index.html` ou de `assets/`, régénère les images et les enregistre dans ce dossier.
- **Manuelle** (depuis la racine du dépôt) :

  ```bash
  npm install
  npx playwright install chromium
  npm run screenshots
  ```

Le script [`scripts/capture-screenshots.mjs`](../../scripts/capture-screenshots.mjs) sert le site en local, passe l'écran de démarrage (`sessionStorage`), force l'affichage des éléments animés et photographie chaque écran avec Chromium.

## Remarque sur les données

Les captures montrent le contenu public du site, tel qu'il est publié : aucune donnée supplémentaire n'y figure.
