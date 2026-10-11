/* ==========================================================================
   data.js — SOURCE UNIQUE DU CONTENU
   --------------------------------------------------------------------------
   Tout ce qui s'affiche sur le site vient de ce fichier. Pour mettre le
   portfolio à jour, on modifie ICI uniquement : aucun HTML à toucher.

   Sources du contenu actuel : CV (PDF), profil GitHub « thomaswithlinux »
   et README des dépôts. Voir docs/CONTENT-GUIDE.md.
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- Identité ------------------------------------------------- */
  profile: {
    name: "Thomas Letard",
    handle: "tletard",                       // utilisé dans le terminal (tletard@portfolio)
    role: "Technicien Supérieur Systèmes & Réseaux",
    // Phrases qui défilent sous le titre du hero
    roles: [
      "Administration systèmes & réseaux",
      "Supervision : Zabbix, Nagios, Grafana",
      "Linux & automatisation",
      "Infrastructure as Code (Terraform)"
    ],
    location: "Nouméa, Nouvelle-Calédonie",
    availability: "Alternant TSSR chez Axians Nouvelle-Calédonie",
    email: "thomasletard3@gmail.com",
    cv: "",                                  // ex. "assets/cv-thomas-letard.pdf" ; vide = bouton masqué
    links: {
      github: "https://github.com/thomaswithlinux",
      linkedin: "https://www.linkedin.com/in/thomas-letard-437998282/"
    },
    stats: [
      { value: 3,  suffix: "",  label: "Outils d'infra publiés" },
      { value: 96, suffix: "",  label: "Tests automatisés (Vigilia)" },
      { value: 4,  suffix: "",  label: "Entreprises & organismes" },
      { value: 7,  suffix: "",  label: "Dépôts GitHub" }
    ]
  },

  /* ---------- À propos ------------------------------------------------- */
  about: {
    paragraphs: [
      "Technicien Systèmes et Réseaux en alternance chez Axians (TSSR, CCI Nouvelle-Calédonie), titulaire d'un Bac Pro Systèmes Numériques avec mention Très Bien et félicitations du jury.",
      "Mon quotidien : virtualisation, supervision, téléphonie, gestion d'adresses IP et support. En parallèle, je transforme ce que je rencontre sur le terrain en outils — sauvegarde de switches, mises à jour automatiques, tableau de bord de supervision — que je publie et documente sur GitHub.",
      "Je m'intéresse de près à Linux, à la cybersécurité et à l'Infrastructure as Code. Je prépare actuellement les certifications Linux Essentials, LFCS et Terraform Associate."
    ],
    facts: [
      { k: "Focus", v: "Linux · Supervision · Automatisation" },
      { k: "Localisation", v: "Nouméa, Nouvelle-Calédonie" },
      { k: "Langues", v: "Français (natif) · Anglais (IELTS B2)" },
      { k: "Hors écran", v: "Pêche & nature" }
    ]
  },

  /* ---------- Compétences (level = 1 à 5) ------------------------------ */
  skills: [
    { group: "Systèmes", items: [
      { name: "Linux (RHEL, Debian/Ubuntu)", level: 4 },
      { name: "Windows Server & Active Directory", level: 4 },
      { name: "Virtualisation", level: 3 }
    ]},
    { group: "Réseaux & supervision", items: [
      { name: "Supervision (Zabbix, Nagios, Grafana)", level: 3 },
      { name: "Switches Alcatel-Lucent OmniSwitch, Cisco", level: 3 },
      { name: "VoIP (3CX, XiVO, Alcatel OXO) & IPAM", level: 3 }
    ]},
    { group: "Automatisation & dev", items: [
      { name: "Bash & PowerShell", level: 3 },
      { name: "Python (Netmiko, outils internes)", level: 3 },
      { name: "Docker & Ansible", level: 2 }
    ]},
    { group: "Cloud & IaC", items: [
      { name: "Terraform (en apprentissage)", level: 2 },
      { name: "Git & GitHub Pages", level: 3 },
      { name: "HTML, CSS & JavaScript", level: 3 }
    ]}
  ],
  // Outils affichés sous forme de « puces » (sans niveau)
  toolbox: [
    "RHEL", "Linux", "Windows Server", "Active Directory", "Zabbix", "Nagios",
    "Grafana", "3CX", "XiVO", "Docker", "Ansible", "Terraform", "Netmiko", "Git"
  ],

  /* ---------- Expérience ----------------------------------------------- */
  experience: [
    {
      period: "Sept. 2025 — 2026",
      title: "Technicien Supérieur Systèmes et Réseaux (N2) — alternance",
      org: "Axians Nouvelle-Calédonie",
      place: "Nouméa",
      points: [
        "Administration systèmes et réseaux : virtualisation et supervision (Zabbix, Nagios).",
        "Téléphonie VoIP : 3CX, XiVO, Alcatel OXO.",
        "IPAM et support informatique."
      ],
      tags: ["Supervision", "VoIP", "Virtualisation"]
    },
    {
      period: "Janv. 2025",
      title: "Technicien Informatique (N2)",
      org: "ZIF Caledonia",
      place: "Nouvelle-Calédonie",
      points: [
        "Installation et configuration de caméras IP.",
        "Dépannage informatique."
      ],
      tags: ["Vidéosurveillance", "Support"]
    },
    {
      period: "Août 2024",
      title: "Technicien Informatique (N2)",
      org: "ZIF Caledonia",
      place: "Nouvelle-Calédonie",
      points: [
        "Déploiement d'infrastructures de sécurité réseau (portail captif).",
        "Mise en place de vidéosurveillance IP."
      ],
      tags: ["Sécurité réseau", "Portail captif"]
    },
    {
      period: "Mars — Avr. 2024",
      title: "Technicien Informatique / Commercial",
      org: "TECHNOTRONIC",
      place: "Koumac",
      points: [
        "Dépannage d'appareils informatiques et conseil commercial en informatique."
      ],
      tags: ["Support", "Conseil"]
    },
    {
      period: "Août — Sept. 2023",
      title: "Helpdesk / Technicien Informatique (N1)",
      org: "DSI Province Nord",
      place: "Province Nord",
      points: [
        "Dépannage d'ordinateurs et de téléphones.",
        "Support hotline."
      ],
      tags: ["Helpdesk"]
    },
    {
      period: "Avr. 2023",
      title: "Technicien Informatique / Commercial",
      org: "TECHNOTRONIC",
      place: "Koumac",
      points: [
        "Conseil technique client et administration réseau : configuration de routeurs, dépannage TV/télécom."
      ],
      tags: ["Réseau", "Conseil"]
    },
    {
      period: "Août — Sept. 2022",
      title: "Administrateur Active Directory / Helpdesk (N1-N2)",
      org: "DSI Province Nord",
      place: "Province Nord",
      points: [
        "Gestion d'Active Directory.",
        "Déploiement de postes de travail et support de niveau 1."
      ],
      tags: ["Active Directory", "Postes de travail"]
    }
  ],

  /* ---------- Projets --------------------------------------------------
     category : filtre cliquable (réutilisez les mêmes mots)
     featured : true → carte plus grande
     link     : URL du dépôt / de l'article ("" = pas de lien)             */
  projects: [
    {
      id: "vigilia",
      title: "Vigilia",
      category: "Supervision",
      year: "2026",
      featured: true,
      summary: "Tableau de bord de supervision en lecture seule pour switches Alcatel-Lucent OmniSwitch (AOS 8) : état des ports, topologie interactive, détection des problèmes avec causes probables, sauvegarde des configurations, rôles et double authentification TOTP. Livré avec Docker, un service systemd durci et 96 tests automatisés.",
      stack: ["Python", "SQLite", "SSH", "Docker", "systemd"],
      link: "https://github.com/thomaswithlinux/vigilia"
    },
    {
      id: "maj-auto-linux",
      title: "maj-auto-linux",
      category: "Automatisation",
      year: "2026",
      featured: false,
      summary: "Script Bash multi-distributions de mise à jour automatique des paquets (apt, dnf/yum, pacman, zypper, apk) : journaux horodatés, rapport envoyé par e-mail, verrou anti-exécution simultanée et purge des anciens logs. Prévu pour tourner la nuit avec cron.",
      stack: ["Bash", "cron", "Linux"],
      link: "https://github.com/thomaswithlinux/maj-auto-linux"
    },
    {
      id: "backup-ale",
      title: "Sauvegarde des switches Alcatel",
      category: "Réseau",
      year: "2026",
      featured: false,
      summary: "Script Python qui se connecte en SSH aux switches OS6450 (Netmiko), récupère la configuration, l'enregistre sur un NAS en SMB et ne conserve que les 5 dernières sauvegardes par équipement. Planifié avec crontab.",
      stack: ["Python", "Netmiko", "SSH", "cron"],
      link: "https://github.com/thomaswithlinux/backup-config-ale-switch"
    },
    {
      id: "portfolio",
      title: "Ce portfolio",
      category: "Web",
      year: "2026",
      featured: false,
      summary: "Site statique sans framework : HTML, CSS et JavaScript natifs, terminal interactif, palette de commandes, accessible et hébergé sur GitHub Pages.",
      stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      link: "https://github.com/thomaswithlinux/portfolio2026"
    },
    {
      id: "sites-clients",
      title: "Sites vitrines pour clients",
      category: "Web",
      year: "2025",
      featured: false,
      summary: "Conception et développement de sites vitrines pour des clients locaux, en HTML, CSS et JavaScript.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: ""
    }
  ],

  /* ---------- Formation & certifications ------------------------------- */
  education: [
    {
      period: "2025 — 2026",
      title: "Technicien Supérieur Systèmes et Réseaux (TSSR) — alternance",
      org: "CCI Nouvelle-Calédonie · Axians",
      detail: "Formation en alternance en administration des systèmes et réseaux."
    },
    {
      period: "2022 — 2024",
      title: "Bac Pro Système Numérique, option RISC",
      org: "Lycée Polyvalent du Mont-Dore, Nouvelle-Calédonie",
      detail: "Réseaux Informatiques et Systèmes Communicants. Mention Très Bien et félicitations du jury."
    }
  ],
  certifications: [
    { name: "IELTS — niveau B2", issuer: "LSI Auckland", year: "2025", status: "Obtenu" },
    { name: "Linux Essentials (010-160)", issuer: "LPI", year: "2026", status: "En cours" },
    { name: "LFCS — Certified System Administrator", issuer: "Linux Foundation", year: "fin 2026", status: "Planifiée" },
    { name: "Terraform Associate", issuer: "HashiCorp", year: "début 2027", status: "Planifiée" }
  ],

  /* ---------- Dépôts GitHub (section « archive », style Exploit-DB) ---- */
  archive: [
    { date: "2026-10-07", title: "vigilia — supervision de switches OmniSwitch", type: "Dépôt", tags: ["Python", "SQLite", "SSH"], url: "https://github.com/thomaswithlinux/vigilia" },
    { date: "2026-10-05", title: "maj-auto-linux — mises à jour automatiques multi-distributions", type: "Dépôt", tags: ["Bash", "cron"], url: "https://github.com/thomaswithlinux/maj-auto-linux" },
    { date: "2026-09-28", title: "backup-config-ale-switch — sauvegarde des configurations OS6450", type: "Dépôt", tags: ["Python", "Netmiko"], url: "https://github.com/thomaswithlinux/backup-config-ale-switch" },
    { date: "2026-09-13", title: "portfolio2026 — portfolio personnel", type: "Dépôt", tags: ["JavaScript", "GitHub Pages"], url: "https://github.com/thomaswithlinux/portfolio2026" },
    { date: "2026-08-30", title: "formation-docker — support de formation Docker (fork)", type: "Formation", tags: ["Docker"], url: "https://github.com/thomaswithlinux/formation-docker" }
  ]
};
