# Sécurité et confidentialité

Ce dépôt contient un **site statique** : pas de serveur applicatif, pas de base de données, pas de comptes, pas de cookies. La surface d'attaque est donc très réduite ; ce document décrit tout de même les choix faits.

## Ce que le site collecte

**Rien.** Aucun traceur, aucun outil d'analyse, aucun cookie.

| Élément | Comportement |
| --- | --- |
| Formulaire de contact | Ouvre la messagerie du visiteur avec un message prérempli (`mailto:`). Aucune donnée n'est envoyée au site ni stockée. |
| `sessionStorage` | Une seule clé, `pf-booted`, pour ne pas rejouer l'écran de démarrage. Elle disparaît à la fermeture de l'onglet. |
| Polices | Inter et JetBrains Mono sont chargées depuis Google Fonts : le navigateur du visiteur contacte donc Google. Pour s'en passer, héberger les polices (voir `docs/DECISIONS.md`, D10). |
| Hébergement | GitHub Pages : GitHub peut journaliser les requêtes selon sa propre politique. |

## Mesures de conception

- **Aucune injection HTML** : l'interface est construite avec `createElement` et `textContent` (jamais `innerHTML` avec du contenu issu des données ou de l'utilisateur). La seule exception, `icon()` dans `core.js`, n'injecte que des chaînes SVG constantes définies dans le code.
- **Liens externes** : `rel="noopener"` systématique sur les liens ouverts dans un nouvel onglet.
- **Terminal** : les commandes sont limitées à une table fixe ; la saisie n'est jamais évaluée (`eval` et `Function` ne sont pas utilisés).
- **Aucune dépendance exécutée côté visiteur** : pas de bibliothèque tierce, donc pas de risque de chaîne d'approvisionnement sur le site publié. Seul l'outillage de développement (`playwright`, pour les captures) a une dépendance, jamais déployée.
- **Workflows GitHub Actions** : permissions minimales déclarées explicitement ; seule la génération des captures écrit dans le dépôt.
- **Validation continue** : `tests/validate.mjs` bloque le déploiement si le contenu ou la structure sont incohérents.

## Données personnelles publiées

Le site affiche volontairement : nom, e-mail professionnel, localisation (ville), parcours et liens GitHub/LinkedIn. Le **numéro de téléphone** du CV n'est pas publié. Un dépôt public expose aussi son historique : ne jamais y committer de secret ni de document privé.

## Signaler un problème

Si vous pensez avoir trouvé une faille ou une information publiée par erreur, merci de **ne pas ouvrir d'issue publique** : utilisez *Security → Report a vulnerability* sur la page du dépôt, ou écrivez à l'adresse indiquée dans la section Contact du site.
