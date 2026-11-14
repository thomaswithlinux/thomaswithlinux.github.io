# Design system

## Intentions

Un portfolio qui montre de l'**implication** : sobre, précis, technique. On évite le « néon cyberpunk » au profit d'un fond presque noir, de très peu de couleurs et de détails soignés (traits fins, typographie mono pour les métadonnées, mouvements courts).

### Références et ce qui en est retenu

| Référence | Apport |
| --- | --- |
| Exploit-DB | Fond sombre, tableau dense, vocabulaire de base de vulnérabilités |
| CrowdSec | Violet/indigo comme accent principal, dégradés doux, halos lumineux |
| Aura (network-engineer) / Walana | Hero très typographique, pastille de statut, esprit futuriste mais épuré |
| Documentation d'API | Barre latérale de navigation, palette de recherche, hiérarchie claire, blocs de code |

## Couleurs

Toutes définies dans `assets/css/base.css` (`:root`).

| Variable | Valeur | Usage |
| --- | --- | --- |
| `--bg` | `#15151c` | Fond de page |
| `--bg-2` | `#1b1b24` | Fond secondaire (en-têtes de tableau, champs) |
| `--surface` | `#22222d` | Cartes |
| `--surface-2` | `#2b2b38` | Survol, éléments élevés |
| `--line` / `--line-2` | `#33333f` / `#434353` | Bordures |
| `--text` | `#f2f1f8` | Texte principal |
| `--text-2` | `#b8b6c9` | Texte secondaire |
| `--muted` | `#817f93` | Métadonnées |
| `--accent` | `#9d86ff` | Violet : actions, repères, éléments actifs |
| `--accent-2` | `#c4aeff` | Lavande : focus, liens du terminal, tags secondaires |
| `--on-accent` | `#15151c` | Texte posé sur un fond accentué |
| `--ok` | `#4ade9b` | Statut disponible, succès |
| `--warn` | `#8ab4ff` | Veille, « en cours / planifié » |

**Règle d'usage :** le violet est l'accent dominant ; la lavande reste rare. Le texte posé sur fond violet est sombre (`--on-accent`) pour garder le contraste. Le dégradé `--grad` n'est utilisé que sur un mot du titre, la barre de progression et les barres de compétence.

Palette actuelle : ardoise violacée + violet/indigo (v1.2.0). Changer toute l'identité : modifier `--accent` et `--accent-2`, ainsi que les valeurs RVB codées dans `layout.css`, `components.css` et `background.js`. Les valeurs RVB du canvas sont dans `background.js` (`COLORS`).

## Typographie

- **Space Grotesk** (400–700) : titres et texte courant. Titres en `letter-spacing` négatif (−0,02 à −0,03 em) pour un rendu serré.
- **JetBrains Mono** (400–600) : tout ce qui est « donnée » — étiquettes, dates, tags, terminal, boutons de filtre.
- Tailles de titre fluides avec `clamp()` (ex. hero : `clamp(34px, 5vw, 58px)`).

## Espacement et formes

- Rayon : 12 px (cartes), 8 px (petits éléments), pastilles à 99 px.
- Sections espacées de 110 px (84 px sur mobile).
- Largeur de contenu maximale : 1040 px ; barre latérale : 264 px.

## Composants

| Composant | Fichier | Notes |
| --- | --- | --- |
| Boutons `.btn`, `--primary`, `--ghost` | components.css | Léger lift au survol |
| Terminal `.term` | components.css | Réutilisé pour le formulaire de contact |
| Carte projet `.project` | components.css | Halo radial qui suit la souris (`--px`, `--py`) |
| Barre de compétence `.skill__bar` | components.css | 5 segments, dégradé décalé par segment |
| Tableau d'archive `table` | components.css | Badges colorés par type (`.badge--lab`, etc.) |
| Timeline `.timeline` / `.tl` | components.css | Ligne dégradée + points |
| Palette `.palette` | components.css | Fenêtre modale centrée |
| Pastille de statut `.pill` / `.dot--ok` | layout.css | Point qui « pulse » |

## Mouvement

| Effet | Durée / courbe | Remarque |
| --- | --- | --- |
| Apparition au scroll | 0,8 s, `cubic-bezier(.22,.8,.24,1)` | Décalage via `--d` |
| Survol de carte | 0,35 s, même courbe | `translateY(-4px)` |
| Compteurs | 1,4 s, easeOutCubic | Une seule fois |
| Texte qui s'écrit | 48 ms / caractère | Boucle |
| Canvas | 60 fps, suspendu si onglet caché | |

Tout est désactivé ou neutralisé avec `prefers-reduced-motion: reduce`.

## Points de rupture

| Largeur | Changement |
| --- | --- |
| ≤ 1180 px | Hero sur une colonne |
| ≤ 1024 px | Barre latérale en tiroir (bouton menu), recherche réduite à l'icône |
| ≤ 760 px | Grilles sur une colonne, liens externes de la topbar masqués |
