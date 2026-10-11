# Journal des décisions

Format : contexte → décision → raison → conséquence.

## D1 — Site statique sans framework
- **Décision :** HTML/CSS/JS natifs, aucune étape de build.
- **Raison :** un portfolio n'a pas besoin de React/Vue ; zéro dépendance = zéro maintenance, chargement très rapide, hébergement gratuit trivial, et le code reste lisible par un recruteur.
- **Conséquence :** pas de composants réutilisables « magiques » — on les remplace par des fonctions `render.js` simples.

## D2 — Contenu séparé dans `data.js`
- **Raison :** mettre à jour le portfolio ne doit jamais nécessiter de toucher au HTML. Une source unique évite aussi les incohérences (le terminal, la palette et les sections lisent les mêmes données).
- **Conséquence :** le contenu dépend de JavaScript (voir D8).

## D3 — Scripts classiques plutôt que modules ES
- **Raison :** les modules sont bloqués en `file://`. Avec des scripts classiques, un double-clic sur `index.html` fonctionne.
- **Conséquence :** un espace de noms global unique (`PF`) pour partager le code, et un ordre de chargement à respecter (voir ARCHITECTURE.md).

## D4 — Direction artistique (révisée en v1.2.0)
- **Décision (v1.2.0) :** gris anthracite chaud et or ambré, d'après une image de référence choisie par l'auteur. Version initiale : fond quasi noir, rouge-orangé et violet.
- **Raison :** l'or sur gris chaud est plus doux et plus lisible qu'un fond quasi noir ; une seule teinte d'accent (or) et une variante claire donnent une sensation de maîtrise. Les ombres, halos et le canvas utilisent les mêmes valeurs RVB.
- **Rejeté :** vert « Matrix » (cliché), thème clair (hors direction demandée — prévu comme évolution possible).

## D5 — Navigation façon documentation
- **Décision :** barre latérale fixe + palette `Ctrl K`.
- **Raison :** référence aux documentations techniques ; un recruteur technique retrouve des codes familiers et navigue vite.

## D6 — Terminal interactif dans le hero
- **Raison :** montre l'appétence technique sans l'écrire noir sur blanc. La démo automatique garantit que le visiteur « comprend » l'idée même sans rien taper.
- **Garde-fous :** la démo s'arrête dès que l'utilisateur prend la main ; toutes les sorties sont construites en `textContent` (pas d'injection HTML).

## D7 — Fond canvas fait main
- **Raison :** une bibliothèque de particules pèse 30–100 Ko ; 90 lignes de code suffisent. Le thème (nœuds reliés) illustre directement le métier.
- **Garde-fous :** nombre de nœuds plafonné, pause hors-écran, version statique en `prefers-reduced-motion`.

## D8 — Rendu côté client et SEO
- **Compromis assumé :** contenu rendu par JavaScript. Google l'indexe correctement ; certains aperçus de liens (réseaux sociaux) ne lisent que le HTML initial, d'où les balises `og:` statiques dans `index.html`.
- **Évolution possible :** script de pré-rendu Node qui injecterait le HTML généré dans `index.html` au build.

## D9 — Formulaire de contact en `mailto:`
- **Raison :** pas de serveur, pas de collecte de données, pas de RGPD à gérer, pas de spam.
- **Limite :** dépend d'un client mail configuré chez le visiteur ; le bouton « Copier l'e-mail » sert de repli.

## D10 — Polices Google Fonts
- **Compromis :** ressource externe (requête vers Google) en échange de deux polices de qualité.
- **Alternative RGPD :** télécharger Inter et JetBrains Mono (licences OpenFont) dans `assets/fonts/` et les déclarer avec `@font-face`.

## D11 — Contenu réel uniquement
- Le contenu provient du CV et de GitHub. Aucune donnée inventée : les statistiques sont des faits vérifiables (96 tests de Vigilia, 7 dépôts, 4 organismes d'accueil). Le titre du hero a été reformulé (« J'administre, je supervise et j'automatise ») pour refléter le poste réel plutôt qu'un discours de sécurité offensive.
- Le numéro de téléphone du CV n'est volontairement pas publié sur un site public.

## D12 — Pas de logo à côté du nom
- Le carré dégradé de la barre supérieure a été retiré ; la marque est désormais le nom seul.

## D13 — Dépôt `thomaswithlinux.github.io`
- **Décision :** un dépôt public portant le nom réservé au site personnel d'un compte GitHub.
- **Raison :** l'URL `https://thomaswithlinux.github.io/` est propre, à la racine, sans nom de dépôt dans le chemin. Les liens relatifs et la page 404 fonctionnent sans configuration.
- **Conséquence :** le dépôt doit être public pour Pages gratuit ; tout son historique est consultable.

## D14 — Captures d'écran générées par la CI
- **Raison :** des images faites à la main deviennent vite fausses. Un script Playwright les régénère à chaque changement du site, avec les mêmes dimensions et le même contenu que la version publiée.
- **Conséquence :** un workflow a le droit d'écrire dans le dépôt (permission `contents: write`, limitée à ce workflow) ; le commit des captures porte `[skip ci]` pour éviter toute boucle.

## D15 — Validation bloquante avant déploiement
- **Raison :** le contenu est un fichier JavaScript édité à la main : une virgule oubliée ou un niveau hors limites casserait tout le site. La validation (sans dépendance) détecte ces erreurs avant publication.

## D16 — Publication du seul dossier du site
- **Raison :** les docs, tests et scripts n'ont pas à être servis sur le site ; seuls `index.html`, `404.html` et `assets/` sont déployés (`_site/`).
