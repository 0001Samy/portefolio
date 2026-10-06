// Toutes les données du portfolio, séparées de l'affichage.
// Modifier ce fichier suffit pour mettre à jour le contenu du site.

export type Category = "reseau" | "systeme" | "securite" | "web";

export type Project = {
  id: string;
  title: string;
  category: Category;
  context: string;
  summary: string;
  stack: string[];
  steps: string[];
  learned: string;
};

export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  kind: "pro" | "formation";
  points: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const profile = {
  name: "Samy BADOUD",
  role: "Technicien systèmes & réseaux",
  school: "Bachelor Informatique & Développement — IPSSI Paris (2ᵉ année)",
  location: "Île-de-France",
  rhythm: "3 semaines entreprise / 1 semaine école",
  github: "https://github.com/0001Samy",
  linkedin: "https://www.linkedin.com/in/samy-b-7b820518b/",
  softSkills: [
    "Gestion du stress",
    "Sens de l'écoute",
    "Adaptabilité",
    "Autonomie",
    "Organisation"
  ],
  languages: ["Français", "Anglais", "Kabyle"]
};

export const categoryLabels: Record<Category, string> = {
  reseau: "Réseau",
  systeme: "Systèmes",
  securite: "Sécurité",
  web: "Web"
};

export const projects: Project[] = [
  {
    id: "reseau-entreprise",
    title: "Réseau d'entreprise complet",
    category: "reseau",
    context: "Projet IPSSI — Cisco Packet Tracer",
    summary:
      "Conception du réseau d'une entreprise multi-services : segmentation, routage dynamique, services et filtrage.",
    stack: ["Packet Tracer", "VLAN", "VTP", "OSPFv2", "NAT/PAT", "ACL"],
    steps: [
      "Découpage en VLAN par service, propagés avec VTP",
      "Routage dynamique OSPFv2 entre les sites",
      "NAT/PAT pour la sortie Internet",
      "ACL pour isoler les services sensibles",
      "Serveurs DHCP, DNS, mail et web",
      "Accès distant SSH et Telnet — SSH privilégié car chiffré"
    ],
    learned:
      "Penser le réseau avant de câbler : plan d'adressage, nommage et documentation évitent la majorité des pannes."
  },
  {
    id: "esxi-vsphere",
    title: "Infrastructure virtualisée ESXi",
    category: "systeme",
    context: "Projet IPSSI — VMware ESXi / vSphere",
    summary:
      "Serveur ESXi hébergeant plusieurs VM Linux de services, administré depuis vSphere, accessible à des clients Windows 10 et CentOS 9.",
    stack: ["VMware ESXi", "vSphere", "Linux", "DNS", "VPN", "Web"],
    steps: [
      "Installation d'ESXi imbriqué dans VMware",
      "Création des VM : web, DNS, VPN, messagerie, téléphonie",
      "Administration centralisée via vSphere",
      "Clients Windows 10 et CentOS 9 consommant les services",
      "Tests de bout en bout : résolution DNS, accès web, tunnel VPN"
    ],
    learned:
      "Un service = une VM : isolation, sauvegarde et redémarrage indépendants. Le DNS est la première chose à vérifier quand tout casse."
  },
  {
    id: "telephonie-cisco",
    title: "Téléphonie IP Cisco",
    category: "reseau",
    context: "Projet IPSSI — GNS3 / VMware",
    summary:
      "Réseau avec service de téléphonie IP : routeurs Cisco émulés sous GNS3, softphones Cisco IP Communicator.",
    stack: ["GNS3", "VoIP", "VMware", "IP Communicator"],
    steps: [
      "Topologie émulée sous GNS3 avec images Cisco",
      "VLAN voix séparé du VLAN data",
      "Configuration du service téléphonie sur le routeur",
      "Enregistrement des softphones IP Communicator",
      "Tests d'appels entre postes"
    ],
    learned:
      "Séparer voix et data garantit la qualité d'appel. GNS3 demande rigueur sur les ressources de la machine hôte."
  },
  {
    id: "pentest-debian",
    title: "Pentest & durcissement Debian",
    category: "securite",
    context: "Lab personnel — Kali vs Debian",
    summary:
      "Attaque d'une Debian depuis Kali, audit, puis durcissement complet et contre-vérification.",
    stack: ["Kali Linux", "Hydra", "nmap", "Lynis", "SSH", "GRUB"],
    steps: [
      "Reconnaissance nmap des services exposés",
      "Brute-force SSH avec Hydra sur un compte faible",
      "Audit Lynis : score initial et liste des faiblesses",
      "Durcissement : SSH par clé, root désactivé, GRUB protégé, services inutiles coupés",
      "Rejeu de l'attaque : échec, score Lynis en hausse",
      "Rédaction d'un guide de durcissement"
    ],
    learned:
      "Attaquer sa propre machine montre concrètement pourquoi chaque règle de sécurité existe."
  },
  {
    id: "owasp-web",
    title: "Pentest web OWASP",
    category: "securite",
    context: "Projet IPSSI — Juice Shop & DVWA",
    summary:
      "Exploitation des failles web classiques sur applications volontairement vulnérables, avec présentation orale et démo.",
    stack: ["Burp Suite", "OWASP Juice Shop", "DVWA", "SQLi", "XSS"],
    steps: [
      "Interception et rejeu des requêtes avec Burp Suite",
      "Injections SQL : contournement d'authentification",
      "XSS réfléchie et stockée",
      "Command injection et file inclusion sur DVWA",
      "Démo live SQLi devant la classe, avec remédiations"
    ],
    learned:
      "Requêtes préparées et échappement des sorties bloquent la majorité des attaques — appliqué ensuite sur mes propres sites."
  },
  {
    id: "edutech",
    title: "Site Edutech Formations",
    category: "web",
    context: "Freelance — juin à août 2026",
    summary:
      "Site d'un organisme de formation : catalogue dynamique, back-office d'administration, formulaires sécurisés et SEO.",
    stack: ["Back-office", "MySQL", "Formulaires", "SEO", "Performance"],
    steps: [
      "Recueil du besoin client",
      "Catalogue de formations dynamique",
      "Back-office pour gérer les formations sans développeur",
      "Formulaires : validation, requêtes préparées, protection XSS/CSRF",
      "SEO : balises méta, structure sémantique, temps de chargement"
    ],
    learned:
      "Travailler pour un vrai client : délais, priorités et explication technique à un non-technicien."
  }
];

export const timeline: TimelineItem[] = [
  {
    period: "Juin → août 2026",
    title: "Développeur web (freelance)",
    place: "Edutech Formations — Asnières-sur-Seine",
    kind: "pro",
    points: [
      "Site complet avec back-office",
      "Formulaires sécurisés, SEO, performances"
    ]
  },
  {
    period: "Depuis nov. 2025",
    title: "Administrateur réseau (projet étudiant)",
    place: "IPSSI Paris",
    kind: "formation",
    points: [
      "Réseau d'entreprise sur Packet Tracer",
      "Téléphonie IP Cisco sous GNS3",
      "Infrastructure ESXi / vSphere"
    ]
  },
  {
    period: "Depuis sept. 2024",
    title: "Bachelor Informatique & Développement",
    place: "IPSSI Paris",
    kind: "formation",
    points: ["2ᵉ année", "Orientation systèmes, réseaux, sécurité"]
  },
  {
    period: "2021 → 2024",
    title: "Support informatique (CDD)",
    place: "OCDE — Paris",
    kind: "pro",
    points: [
      "Support technique des réunions : poste, audio, vidéo",
      "Résolution d'incidents matériels en temps réel",
      "Comptes rendus techniques"
    ]
  },
  {
    period: "Févr. → avr. 2021",
    title: "Intervenant en informatique (CDD)",
    place: "Magic Makers",
    kind: "pro",
    points: ["Scratch pour les 7-10 ans", "Initiation au C pour les 14-17 ans"]
  },
  {
    period: "2019 → 2021",
    title: "Programme Grande École",
    place: "Epitech",
    kind: "formation",
    points: ["Bases en C, projets en équipe"]
  }
];

export const skills: SkillGroup[] = [
  {
    title: "Réseau & télécom",
    items: ["Cisco", "VLAN / OSPF / ACL", "VPN", "Firewall", "Supervision", "GNS3", "Packet Tracer"]
  },
  {
    title: "Systèmes",
    items: ["Linux Debian", "Windows Server 2019", "Active Directory", "WDS", "VMware ESXi", "Proxmox", "Docker"]
  },
  {
    title: "Sécurité",
    items: ["Kali Linux", "Metasploit", "Burp Suite", "Hydra", "nmap", "Lynis"]
  },
  {
    title: "Cloud & données",
    items: ["AWS", "Microsoft Azure", "OVHcloud", "MySQL", "SQL Server"]
  },
  {
    title: "Développement",
    items: ["Python", "C", "C#", "JavaScript", "React / Next.js", "Node.js", "WordPress"]
  },
  {
    title: "Outils",
    items: ["Git / GitHub", "Visual Studio"]
  }
];
