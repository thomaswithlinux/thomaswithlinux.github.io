# Design system

## Intentions

Un portfolio qui montre de l'**implication** : sobre, précis, technique. On évite le « néon cyberpunk » au profit d'un fond presque noir, de très peu de couleurs et de détails soignés (traits fins, typographie mono pour les métadonnées, mouvements courts).

### Références et ce qui en est retenu

| Référence | Apport |
| --- | --- |
| Exploit-DB | Palette sombre + rouge-orangé, tableau dense, vocabulaire de base de vulnérabilités |
| CrowdSec | Violet/indigo en second accent, dégradés doux, halos lumineux |
| Aura (network-engineer) / Walana | Hero très typographique, pastille de statut, esprit futuriste mais épuré |
| Documentation d'API | Barre latérale de navigation, palette de recherche, hiérarchie claire, blocs de code |

## Couleurs

Toutes définies dans `assets/css/base.css` (`:root`).

| Variable | Valeur | Usage |
| --- | --- | --- |
| `--bg` | `#1e1e21` | Fond de page |
| `--bg-2` | `#242427` | Fond secondaire (en-têtes de tableau, champs) |
| `--surface` | `#2b2b2f` | Cartes |
| `--surface-2` | `#343439` | Survol, éléments élevés |
| `--line` / `--line-2` | `#3a3a3f` / `#4a4a51` | Bordures |
| `--text` | `#f3f1ec` | Texte principal |
| `--text-2` | `#bdbbb5` | Texte secondaire |
| `--muted` | `#85837e` | Métadonnées |
| `--accent` | `#f5b53f` | Or ambré : actions, repères, éléments actifs |
| `--accent-2` | `#ffd479` | Or clair : focus, liens du terminal, tags secondaires |
| `--ok` | `#3ddc97` | Statut disponible, succès |
| `--warn` | `#e08a3c` | Veille, « en préparation » |

**Règle d'usage :** l'or ambré est l'accent dominant ; l'or clair reste rare. Le texte posé sur fond or est sombre (`#1b1b1d`) pour garder le contraste. Le dégradé `--grad` n'est utilisé que sur un mot du titre, la barre de progression et les barres de compétence.

Palette actuelle : gris anthracite chaud + or ambré, d'après l'image de référence fournie (v1.2.0). Changer toute l'identité : modifier `--accent` et `--accent-2`, ainsi que les valeurs RVB codées dans `layout.css`, `components.css` et `background.js`. Les valeurs RVB du canvas sont dans `background.js` (`COLORS`).

## Typographie

- **Inter** (400–800) : titres et texte courant. Titres en `letter-spacing` négatif (−0,025 à −0,035 em) pour un rendu serré.
- **JetBrains Mono** (400–600) : tout ce qui est « donnée » — étiquettes, dates, tags, terminal, boutons de filtre.
- Tailles de titre fluides avec `clamp()` (ex. hero : `clamp(36px, 5.2vw, 62px)`).

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
