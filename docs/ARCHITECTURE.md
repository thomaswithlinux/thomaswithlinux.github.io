# Architecture technique

## Principe général

Le site est **100 % statique** et **piloté par les données** :

```text
data.js ──► render.js ──► DOM (sections remplies)
              ▲
index.html (squelette + conteneurs vides)
```

- `index.html` contient la structure et des conteneurs vides (`#skills-grid`, `#projects-grid`, …).
- `data.js` contient tout le contenu dans un objet global `window.PORTFOLIO`.
- `render.js` lit cet objet et construit le DOM.
- Les autres scripts ajoutent le comportement (animations, terminal, palette).

Modifier un texte, ajouter un projet ou une compétence ne demande donc **jamais** de toucher au HTML.

## Ordre de chargement des scripts

Les scripts sont des scripts classiques (pas de `type="module"`), chargés dans cet ordre en bas de `<body>` :

| # | Fichier | Rôle | Dépend de |
| - | --- | --- | --- |
| 1 | `data.js` | Définit `window.PORTFOLIO` | — |
| 2 | `core.js` | Crée l'espace de noms `window.PF` (outils + données) | data |
| 3 | `render.js` | Remplit les sections | core |
| 4 | `background.js` | Canvas de fond | core |
| 5 | `terminal.js` | Terminal du hero ; expose `PF.startTerminalDemo` | core |
| 6 | `ui.js` | Interactions globales | core, render (les cartes doivent exister) |
| 7 | `boot.js` | Intro ; lance la démo du terminal en fin de séquence | terminal |

**Pourquoi pas de modules ES ?** Les navigateurs bloquent les `import` en `file://`. Avec des scripts classiques, le site fonctionne même en double-cliquant sur `index.html`, sans serveur.

## Détail des modules

### `core.js`
- `h(tag, props, ...children)` : création d'éléments **sans `innerHTML`** — le contenu textuel passe toujours par `textContent`, ce qui élimine tout risque d'injection même si `data.js` est un jour alimenté par une source externe.
- `icon(name)` : icônes SVG en trait, héritant de `currentColor`.
- `reducedMotion`, `finePointer` : préférences utilisateur lues une seule fois.
- `session` : accès à `sessionStorage` protégé par `try/catch` (certains navigateurs le bloquent).

### `render.js`
Une fonction par section (`hero`, `about`, `skills`, `projects`, `archive`, `experience`, `education`) plus `bind()` qui gère les attributs :

- `data-bind="profile.name"` → remplace le texte de l'élément.
- `data-href="profile.links.github"` → renseigne `href` ; **masque** l'élément si la valeur est vide (ex. bouton CV).

### `background.js`
Canvas plein écran en `position: fixed`. Nombre de nœuds proportionnel à la surface (28 à 90). Boucle `requestAnimationFrame` suspendue quand l'onglet est caché. En mode « animations réduites », une seule image statique est dessinée.

### `terminal.js`
Table `commands` (nom → fonction). La démo automatique s'interrompt dès que l'utilisateur donne le focus au champ. Les réponses sont calculées depuis `PF.D`, donc toujours à jour.

### `ui.js`
Sommaire en en-tête de fichier : texte qui s'écrit, `IntersectionObserver` (apparition + compteurs + scrollspy), progression de lecture, menu mobile, effets de souris, palette de commandes, contact.

### `boot.js`
Séquence d'intro, mémorisée via `sessionStorage` (`pf-booted`) pour ne pas se répéter à chaque navigation. Ignorée si l'utilisateur préfère réduire les animations.

## CSS

Trois fichiers, du plus général au plus spécifique : `base.css` → `layout.css` → `components.css`. Voir [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Performance

- Aucune dépendance JavaScript, aucun framework : ~35 Ko de JS non minifié au total.
- Seules ressources externes : deux polices Google Fonts (`display=swap`, le texte reste lisible pendant le chargement).
- Animations limitées à `transform` et `opacity` (composées par le GPU).
- Canvas limité à un `devicePixelRatio` de 2.

## Accessibilité

- Lien d'évitement « Aller au contenu ».
- Contraste texte/fond conforme (texte principal ≈ 15:1, texte secondaire ≈ 8:1).
- Focus clavier visible, boutons natifs, `aria-pressed` sur les filtres, `role="dialog"` sur la palette.
- `prefers-reduced-motion` respecté partout (CSS et JS).
- Sans JavaScript : un message `<noscript>` donne l'e-mail de contact.

## Limites connues

- Le formulaire de contact ouvre le client mail de l'utilisateur (`mailto:`) : il n'y a volontairement pas de serveur. Pour un vrai envoi, brancher un service comme Formspree ou Web3Forms.
- Le contenu étant rendu par JavaScript, un robot qui n'exécute pas JS ne voit que le squelette. Les moteurs de recherche modernes exécutent JS ; si le SEO devient critique, pré-générer le HTML (voir `DECISIONS.md`).

## Outillage et intégration continue

| Élément | Rôle |
| --- | --- |
| `tests/validate-lib.mjs` | Règles de validation (fonction pure, sans dépendance) |
| `tests/validate.mjs` | Lance la validation : syntaxe JS + contenu + cohérence HTML ↔ données ↔ scripts |
| `scripts/capture-screenshots.mjs` | Génère `docs/screenshots/*.png` avec Playwright |
| `scripts/serve.ps1`, `lancer-le-site.bat` | Serveur local pour Windows (sans Node ni Python) |
| `.github/workflows/pages.yml` | Valide, puis déploie `index.html`, `404.html` et `assets/` sur GitHub Pages |
| `.github/workflows/screenshots.yml` | Régénère et enregistre les captures quand le site change |

Flux d'un push sur `main` : `validate` (bloquant) → `deploy` ; en parallèle, `screenshots` met à jour les images si le site a changé. Le commit des captures porte `[skip ci]` et ne relance rien.

## Validation : ce qui est contrôlé

1. Syntaxe de chaque fichier de `assets/js/`.
2. Contenu de `data.js` : champs obligatoires, niveaux de compétence de 1 à 5, identifiants de projets uniques, URLs en `https`, dates `AAAA-MM-JJ`, types d'archive connus.
3. Cohérence : chaque `data-bind` / `data-href` pointe vers une donnée existante, chaque `$('#id')` des scripts existe dans `index.html`, chaque `data-spy` correspond à une section, chaque fichier `assets/` référencé existe.