# Portfolio — Thomas Letard

Portfolio personnel d'un **technicien supérieur systèmes & réseaux** (alternance TSSR, Nouméa) : parcours, compétences et projets d'infrastructure — supervision, automatisation, Linux.
Site **statique** (HTML, CSS et JavaScript natifs), **sans framework ni étape de build**, hébergé sur GitHub Pages.

**🌐 En ligne : <https://thomaswithlinux.github.io/>**

![Accueil du portfolio](docs/screenshots/01-accueil.png)

> Les captures de ce dépôt sont **générées automatiquement** par GitHub Actions (voir [docs/screenshots](docs/screenshots/README.md)) : elles reflètent toujours la version publiée.

## Fonctionnalités

| | |
| --- | --- |
| **Écran de démarrage** | Séquence façon boot Linux, jouée une fois par session, passable d'un clic ou d'une touche |
| **Accueil** | Titre, texte qui s'écrit, statistiques animées et **terminal interactif** (`help`, `whoami`, `skills`, `projects`, `goto <section>`…) |
| **Navigation façon documentation** | Barre latérale avec suivi de lecture (scrollspy), barre de progression, menu en tiroir sur mobile |
| **Palette de commandes** | `Ctrl/⌘ + K` : aller à une section, copier l'e-mail, ouvrir GitHub/LinkedIn |
| **Compétences** | Niveaux en 5 segments animés, par domaine (systèmes, réseaux & supervision, automatisation, cloud & IaC) |
| **Projets** | Cartes filtrables par catégorie, halo lumineux qui suit la souris, liens vers les dépôts |
| **Dépôts GitHub** | Tableau filtrable et trié par date, avec badges par type |
| **Parcours** | Frise de l'expérience et de la formation, certifications (obtenues, en cours, planifiées) |
| **Contact** | Copie de l'e-mail en un clic, formulaire qui prépare un `mailto:` (aucune donnée stockée) |
| **Fond animé** | Réseau de nœuds en canvas réagissant au curseur, suspendu quand l'onglet est caché |
| **Accessibilité** | Lien d'évitement, focus visible, sémantique HTML, `prefers-reduced-motion` respecté |
| **Qualité** | Validation automatique du contenu et du code à chaque push, page 404 dédiée |

<table>
<tr>
<td><img src="docs/screenshots/02-terminal-interactif.png" alt="Terminal interactif"><br><sub>Terminal interactif</sub></td>
<td><img src="docs/screenshots/10-palette-commandes.png" alt="Palette de commandes"><br><sub>Palette de commandes (Ctrl + K)</sub></td>
</tr>
<tr>
<td><img src="docs/screenshots/04-competences.png" alt="Compétences"><br><sub>Compétences par domaine</sub></td>
<td><img src="docs/screenshots/05-projets.png" alt="Projets"><br><sub>Projets filtrables</sub></td>
</tr>
<tr>
<td><img src="docs/screenshots/06-depots-github.png" alt="Dépôts GitHub"><br><sub>Dépôts GitHub</sub></td>
<td><img src="docs/screenshots/07-experience.png" alt="Expérience"><br><sub>Parcours professionnel</sub></td>
</tr>
<tr>
<td><img src="docs/screenshots/11-mobile.png" alt="Version mobile" width="260"><br><sub>Version mobile</sub></td>
<td><img src="docs/screenshots/12-mobile-menu.png" alt="Menu mobile" width="260"><br><sub>Menu mobile</sub></td>
</tr>
</table>

Autres écrans : [à propos](docs/screenshots/03-a-propos.png) · [formation](docs/screenshots/08-formation.png) · [contact](docs/screenshots/09-contact.png)

## Démarrage rapide

Aucune installation : le site fonctionne en ouvrant `index.html`. Pour le servir comme en production :

```bash
git clone https://github.com/thomaswithlinux/thomaswithlinux.github.io.git
cd thomaswithlinux.github.io
python -m http.server 8000
```

Puis ouvrir <http://localhost:8000>. Sous Windows, `lancer-le-site.bat` démarre un serveur local et ouvre le navigateur.

## Personnaliser le contenu

**Tout le contenu est dans un seul fichier : [`assets/js/data.js`](assets/js/data.js).** On y modifie le profil, les compétences, les projets, le parcours et les dépôts ; le HTML n'est jamais à toucher. Guide complet : **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)**.

| Section | Clé dans `data.js` |
| --- | --- |
| Identité, liens, statistiques, bouton CV | `profile` |
| À propos | `about` |
| Compétences (niveau 1 à 5) | `skills`, `toolbox` |
| Expérience | `experience` |
| Projets | `projects` |
| Dépôts / write-ups | `archive` |
| Formation, certifications | `education`, `certifications` |

## Tests et qualité

```bash
node tests/validate.mjs        # ou : npm test
```

La validation (Node ≥ 20, aucune dépendance) contrôle :

- la **syntaxe** de chaque script JavaScript ;
- le **contenu** : champs obligatoires, niveaux de 1 à 5, identifiants de projets uniques, URLs en `https`, dates `AAAA-MM-JJ`, types d'archive connus ;
- la **cohérence** : chaque donnée référencée par le HTML existe, chaque `#id` utilisé par les scripts est présent dans la page, chaque fichier `assets/` référencé existe.

Elle tourne à chaque push et **bloque le déploiement** en cas d'erreur.

## Déploiement

Le site est publié par [GitHub Actions](.github/workflows/pages.yml) à chaque push sur `main` : validation, puis publication des seuls fichiers du site (`index.html`, `404.html`, `assets/`). Mise en route et domaine personnalisé : **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## Documentation

| Document | Contenu |
| --- | --- |
| [docs/UTILISATION.md](docs/UTILISATION.md) | Ce que le visiteur peut faire : navigation, terminal, raccourcis |
| [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) | Modifier chaque section, ajouter une section ou une commande |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Fonctionnement, ordre des scripts, performance, accessibilité |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Couleurs, typographie, composants, mouvement |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | GitHub Pages pas à pas, domaine personnalisé |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Le « pourquoi » de chaque choix |
| [docs/screenshots](docs/screenshots/README.md) | Captures d'écran et leur génération |
| [SECURITY.md](SECURITY.md) | Confidentialité, mesures de sécurité, signalement |
| [CHANGELOG.md](CHANGELOG.md) | Historique des versions |

## Structure du dépôt

```text
index.html                    page principale (structure et conteneurs)
404.html                      page d'erreur
assets/
├── css/
│   ├── base.css              variables (couleurs, polices), reset, typographie
│   ├── layout.css            barre du haut, menu latéral, sections, accueil, responsive
│   └── components.css        boutons, terminal, cartes, tableau, frise, palette…
├── js/
│   ├── data.js               ★ contenu du site (le seul fichier à éditer)
│   ├── core.js               utilitaires partagés (DOM, icônes, préférences)
│   ├── render.js             construit les sections à partir de data.js
│   ├── background.js         réseau de nœuds animé (canvas)
│   ├── terminal.js           terminal interactif
│   ├── ui.js                 interactions (scroll, palette, contact…)
│   └── boot.js               écran de démarrage
└── img/favicon.svg
docs/                         documentation et captures d'écran
tests/                        validation du contenu et des scripts
scripts/                      captures d'écran (Playwright), serveur local Windows
.github/workflows/            déploiement Pages, génération des captures
```

## Technologies

HTML5 · CSS3 (variables, grid, `backdrop-filter`) · JavaScript ES2020 sans module ni dépendance · Polices [Inter](https://fonts.google.com/specimen/Inter) et [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (SIL Open Font License 1.1) · GitHub Actions · Playwright (captures uniquement).

## Limites connues

- Le contenu est rendu par JavaScript : sans JS, seul un message de contact s'affiche. Les balises `og:` statiques assurent les aperçus de liens.
- Le formulaire de contact dépend d'un client de messagerie configuré chez le visiteur (le bouton « Copier » sert de repli).
- Les polices viennent de Google Fonts (voir [SECURITY.md](SECURITY.md) pour l'alternative auto-hébergée).
- Thème sombre uniquement.

## Licence

Aucune licence n'est fournie pour le moment : **tous droits réservés** sur le code et le contenu (textes, parcours, identité). Le dépôt est public pour consultation. Le propriétaire peut ajouter une licence (par exemple MIT pour le code) en créant un fichier `LICENSE`.
