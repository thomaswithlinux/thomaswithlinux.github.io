# Guide du contenu

Tout se modifie dans [`assets/js/data.js`](../assets/js/data.js). Après chaque changement, rechargez la page : aucune étape de build.

> Le contenu actuel provient du CV, du profil GitHub « thomaswithlinux » et des README des dépôts. Les **niveaux de compétence** sont une estimation à ajuster, et les entrées LinkedIn (certifications, anciens postes) n'ont pas pu être importées automatiquement.

## Vérifier avant de pousser

```bash
node tests/validate.mjs
```

Le message indique précisément le champ fautif (ex. `skills[0].items[1].level doit être un entier de 1 à 5`). La même vérification bloque le déploiement sur GitHub.

## Checklist avant publication

- [ ] `profile.name`, `role`, `location`
- [ ] `profile.email` (adresse affichée et utilisée par le formulaire)
- [ ] `profile.links.github` et `linkedin` — **vos vrais profils**
- [ ] `profile.availability` (texte de la pastille verte)
- [ ] `profile.stats` — chiffres **réels** uniquement
- [ ] `about` — 3 paragraphes max, le premier sert aussi de phrase d'accroche dans le hero
- [ ] `skills` — niveaux honnêtes (voir ci-dessous)
- [ ] `projects` — remplacer les exemples, ajouter les liens
- [ ] `experience`, `education`, `certifications`
- [ ] `archive` — vos vrais write-ups, ou supprimer la section
- [ ] `index.html` : `<title>` et balises `og:` (nom et description)
- [ ] CV : déposer un PDF dans `assets/` et renseigner `profile.cv`

## Référence des champs

### `profile`
| Champ | Description |
| --- | --- |
| `handle` | Identifiant du terminal (`handle@portfolio:~$`) — court, sans espaces |
| `roles` | Phrases qui défilent sous le titre |
| `cv` | Chemin vers un PDF. **Vide = bouton masqué** |
| `stats` | `{ value, suffix, label }` — `value` est animé de 0 à sa valeur |

### `skills`
Groupes `{ group, items: [{ name, level }] }`, `level` de 1 à 5.

| Niveau | Signification suggérée |
| --- | --- |
| 1 | Notions |
| 2 | Bases, usage guidé |
| 3 | Autonome sur des cas courants |
| 4 | À l'aise, utilisé en projet réel |
| 5 | Expert, capable d'enseigner |

Mieux vaut peu de 5 que beaucoup : un niveau crédible est plus convaincant.

### `projects`
```js
{
  id: "homelab",            // identifiant unique
  title: "Homelab segmenté",
  category: "Réseau",       // crée automatiquement le bouton de filtre
  year: "2026",
  featured: true,           // carte pleine largeur
  summary: "2 phrases : contexte, ce que vous avez fait, résultat.",
  stack: ["Proxmox", "pfSense"],
  link: "https://github.com/…"   // "" = carte sans lien
}
```
Conseil : un bon résumé répond à *quel problème ?*, *quelle solution ?*, *quel résultat ?*.

### `archive`
`type` doit être l'un de : `Article`, `Write-up`, `Lab`, `Veille`, `Dépôt`, `Formation` (chacun a sa couleur ; la validation refuse les autres). Pour un nouveau type, ajouter une règle `.badge--mon-type` dans `components.css`. Les lignes sont triées par date décroissante (format `AAAA-MM-JJ`).

### `experience` / `education`
Les puces (`points`) fonctionnent mieux avec un verbe d'action et un chiffre : « Réduit le temps de déploiement de 2 h à 10 min ».

## Ajouter une section

1. Ajouter dans `index.html` une `<section class="section" id="ma-section">` avec un en-tête `.section__head`.
2. Ajouter le lien correspondant dans la `<aside class="sidebar">` (attribut `data-spy="ma-section"`).
3. Écrire la fonction de rendu dans `render.js` et l'appeler en bas du fichier.
4. Optionnel : ajouter l'entrée dans la palette (`ui.js`, tableau `entries`).

## Ajouter une commande au terminal

Dans `terminal.js`, ajouter une entrée à l'objet `commands` :

```js
hobbies() { line(v('CTF, homelab, photographie')); },
```
Puis la lister dans `help()`.

## Changer le titre ou la description du site

`index.html`, balises `<title>`, `<meta name="description">` et `og:*` (non pilotées par `data.js`, car lues avant l'exécution du JavaScript par les robots).
