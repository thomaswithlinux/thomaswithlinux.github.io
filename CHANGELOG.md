# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [1.2.0] — 2026-11-14

### Modifié
- Nouvelle identité visuelle : palette violet / indigo sur fond ardoise à la place de l'or ambré.
- Typographie : **Space Grotesk** remplace Inter pour le texte (JetBrains Mono conservé pour le code).
- Contenu recentré sur la passion pour Linux : titre du hero, section « À propos », phrases du hero, groupe de compétences « Linux » placé en premier, encart « Passion » dans les faits.
- Séquence de démarrage réécrite autour de systemd.
- Favicon, bannière du README et couleurs du fond animé alignées sur la nouvelle palette.

### Supprimé
- Terraform : certification, compétence, groupe « Cloud & IaC » et puce d'outil.
- Certification Linux Essentials (010-160).

### Ajouté
- Certifications LFCS (Linux Foundation) et LPIC-1 (LPI).
- Catégorie de projet « Linux ».

## [1.1.0] — 2026-10-11

### Modifié
- Contenu réel (CV + GitHub) à la place des exemples : expériences, formation, certifications, projets (Vigilia, maj-auto-linux, sauvegarde Alcatel), section « Dépôts GitHub ».
- Titre du hero et textes de sections adaptés au profil.
- Logo carré retiré de la barre supérieure.
- Serveur local : types MIME PDF/WebP/polices.

## [1.0.0] — 2026-10-11

### Ajouté
- Structure du site : hero, à propos, compétences, projets, archive, expérience, formation, contact.
- Contenu piloté par `assets/js/data.js`.
- Design system sombre (rouge-orangé + violet), variables CSS centralisées.
- Séquence de démarrage, texte qui s'écrit, compteurs animés.
- Terminal interactif (`help`, `whoami`, `skills`, `projects`, `experience`, `contact`, `goto`, `clear`, `ls`).
- Fond de réseau animé en canvas.
- Barre latérale façon documentation avec scrollspy, barre de progression de lecture.
- Palette de commandes `Ctrl/⌘ + K`.
- Filtres de projets, tableau d'archive filtrable.
- Formulaire de contact `mailto:` et copie de l'e-mail.
- Accessibilité : lien d'évitement, focus visible, `prefers-reduced-motion`.
- Workflow GitHub Pages et documentation complète (`docs/`).
