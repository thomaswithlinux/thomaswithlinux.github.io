# Déploiement sur GitHub Pages

Le dépôt s'appelle **`thomaswithlinux.github.io`** : c'est le nom réservé par GitHub pour le site personnel d'un compte. Le site est donc servi à la racine, à l'adresse :

**<https://thomaswithlinux.github.io/>**

## Comment ça marche

À chaque `push` sur `main`, le workflow [`pages.yml`](../.github/workflows/pages.yml) :

1. **valide** le contenu et les scripts (`node tests/validate.mjs`) — en cas d'erreur, rien n'est publié ;
2. **prépare** un dossier `_site/` contenant uniquement `index.html`, `404.html` et `assets/` (les docs, tests et scripts ne sont pas publiés) ;
3. **publie** ce dossier sur GitHub Pages.

Un second workflow, [`screenshots.yml`](../.github/workflows/screenshots.yml), régénère les captures d'écran de la documentation lorsque le site change.

## Mise en route (une seule fois)

> GitHub n'autorise pas l'activation de Pages sans action manuelle du propriétaire.

1. Ouvrir le dépôt → **Settings → Pages**.
2. Dans **Build and deployment → Source**, choisir **GitHub Actions**.
3. Ouvrir l'onglet **Actions**, puis relancer le workflow « Validation et déploiement » (*Run workflow*, ou *Re-run all jobs* si la première exécution a échoué faute de Pages activé).
4. Quelques dizaines de secondes plus tard, le site est en ligne ; l'adresse s'affiche dans **Settings → Pages**.

## Mettre à jour le site

```bash
# modifier assets/js/data.js (ou autre), puis :
git add .
git commit -m "feat: ajout d'un projet"
git push
```

Le déploiement suit automatiquement. Avant de pousser, on peut vérifier en local : `node tests/validate.mjs`.

| Situation | Que faire |
| --- | --- |
| Le workflow « validate » échoue | Lire le message : il indique le champ ou le fichier fautif |
| Le site n'a pas changé | Vider le cache du navigateur (`Ctrl + F5`) ; vérifier l'onglet Actions |
| Erreur « Pages not enabled » | Faire l'étape 2 de la mise en route |
| Retour arrière | `git revert <commit>` puis `git push` |

## Domaine personnalisé (optionnel)

1. Chez le registrar, créer un enregistrement `CNAME` : `www` → `thomaswithlinux.github.io` (et des enregistrements `A` vers les IP de GitHub Pages pour le domaine nu — voir la [documentation GitHub](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
2. **Settings → Pages → Custom domain** : saisir le domaine, puis cocher **Enforce HTTPS**.
3. Mettre à jour les URLs affichées dans le README.

Avec le déploiement par Actions, aucun fichier `CNAME` n'est nécessaire dans le dépôt.

## Chemins relatifs

Les ressources du site utilisent des chemins **relatifs** (`assets/css/…`). Seule `404.html` utilise des chemins absolus (`/assets/…`), car elle peut être servie depuis n'importe quelle profondeur d'URL. Ces deux choix supposent un site à la **racine d'un domaine**, ce qui est le cas ici.

## Avant de publier une modification

- [ ] `node tests/validate.mjs` réussi
- [ ] Informations vérifiées (dates, intitulés, liens)
- [ ] Aucune donnée privée (téléphone, adresse) ni secret dans les fichiers : l'historique d'un dépôt public est consultable
- [ ] `<title>`, description et balises `og:` de `index.html` à jour si le poste change
