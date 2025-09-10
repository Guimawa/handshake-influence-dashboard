# Dashboard Starter Vide - Documentation Développeur

## 🎯 Objectif
Starter code React + Tailwind + Framer Motion, structure UI fidèle aux spécifications exactes (aucun contenu métier). Prévu pour évoluer : chaque fonctionnalité à intégrer dans un slot prévu, 100% modulaire.

## 📁 Structure du Projet

```
src/
├── components/
│   ├── layout/           # Composants de layout
│   │   ├── Sidebar.jsx   # Navigation verticale avec drawer mobile
│   │   └── Topbar.jsx    # Barre supérieure avec actions
│   ├── dashboard/        # Composants de contenu principal
│   │   ├── MainContent.jsx    # Zone centrale (header, search, tabs, panel)
│   │   └── RankingPanel.jsx   # Panel droit (ranking, stats)
│   ├── modules/          # Modules futurs
│   │   ├── Modal.jsx     # Modale générique
│   │   └── Toast.jsx     # Système de notifications
│   └── ui/               # Composants UI de base (shadcn/ui)
├── App.jsx               # Composition globale
├── index.css             # Variables CSS, animations, responsive
└── main.jsx              # Point d'entrée
```

## 🎨 Palette de Couleurs (Pixel-Perfect)

```css
/* Couleurs principales */
--color-bg: #181E29;           /* Fond global */
--color-panel: #232B3E;        /* Panels/sidebar/topbar */
--color-input: #222C3B;        /* Inputs/search */
--color-primary: #3B82F6;      /* Bleu bouton/tab actif */
--color-accent: #2563eb;       /* Bleu hover bouton/tab */
--color-text-main: #F1F5F9;    /* Texte principal */
--color-text-sub: #AAB7C6;     /* Sous-titre/placeholder */
--color-border: #222C3B;        /* Borders/tabs */
--color-danger: #EF4444;        /* Badge notif */
--color-success: #22C55E;       /* Vert statut */
```

## 🔧 Animations NANO-Précises

### Timing & Easing
- **Durée standard** : 120ms
- **Easing principal** : `cubic-bezier(0.23,1,0.32,1)`
- **Easing drawer** : `cubic-bezier(0.42,0,0.58,1)`
- **Easing spring** : `bounce: 0.18, duration: 0.22`

### Micro-interactions
- **Hover** : `scale: 1.04`, `duration: 0.12s`
- **Tap** : `scale: 0.98`, `duration: 0.08s`
- **Focus** : `ring-2 ring-[#3B82F6]`
- **Border slide-in** : `width: 0 → 4px`, `duration: 0.15s`

## 📱 Responsive Design

### Breakpoints
- **Desktop XL** : >1200px (sidebar pleine, panel droit à côté)
- **Desktop** : 900-1200px (sidebar pleine, panel droit compact)
- **Tablet** : 700-900px (sidebar compact, panel droit en-dessous)
- **Mobile** : <700px (sidebar drawer, panel droit full width)

### Classes Responsive
```css
.sidebar-desktop-xl    /* w-[90px] */
.sidebar-tablet        /* w-14 */
.sidebar-mobile        /* w-14 */
.panel-desktop-xl      /* min-h-[320px] p-10 */
.panel-mobile          /* min-h-[180px] p-4 */
.padding-responsive    /* p-8 desktop-xl:p-10 mobile:p-4 */
.gap-responsive        /* gap-6 desktop-xl:gap-8 mobile:gap-3 */
```

## ♿ Accessibilité (ARIA Complète)

### Navigation Clavier
- **TAB** : avancer, **SHIFT+TAB** : reculer
- **Ordre** : sidebar → topbar → main → panel droit
- **Focus ring** : `focus-visible:ring-2 focus-visible:ring-[#3B82F6]`

### ARIA Labels
```jsx
// Sidebar
<aside role="navigation" aria-label="Barre de navigation principale">
<button aria-label="Dashboard" aria-current="page">

// Topbar
<header role="banner">
<button aria-label="Nouveau projet">

// Main Content
<main role="main">
<input aria-label="Recherche">

// Tabs
<div role="tablist">
<button role="tab" aria-selected={active}>

// Panel Droit
<aside role="complementary" aria-label="Zone latérale">
```

### Focus Trap
- **Modales** : focus reste dans la modale
- **Drawer** : focus sur premier élément à l'ouverture
- **ESC** : fermeture des overlays

## 🧩 Modules Futurs

### Modal
```jsx
import { Modal } from './components/modules/Modal';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Titre de la modale"
  showCloseButton={true}
  closeOnOverlayClick={true}
  closeOnEscape={true}
>
  {/* Contenu de la modale */}
</Modal>
```

### Toast
```jsx
import { useToast, ToastContainer } from './components/modules/Toast';

const { toasts, showSuccess, showError, removeToast } = useToast();

// Utilisation
showSuccess("Succès", "Action réalisée avec succès");
showError("Erreur", "Une erreur s'est produite");

// Container
<ToastContainer toasts={toasts} onRemove={removeToast} />
```

## 🚀 Installation & Démarrage

```bash
# Installation des dépendances
pnpm install

# Démarrage en développement
pnpm dev

# Build de production
pnpm build

# Déploiement Vercel
vercel --prod
```

## 📋 Règles de Développement

### ✅ À FAIRE
- Utiliser les classes Tailwind personnalisées
- Respecter les timings d'animation exacts
- Tester l'accessibilité (TAB, screen reader)
- Vérifier le responsive sur tous breakpoints
- Ajouter chaque nouvelle fonctionnalité dans un composant dédié

### ❌ À ÉVITER
- Ne jamais ajouter de contenu métier dans la base
- Ne pas modifier les couleurs sans validation
- Ne pas ignorer l'accessibilité
- Ne pas casser les animations existantes
- Ne pas inventer de nouvelles classes sans documentation

## 🧪 Tests QA

### Checklist Pixel-Perfect
- [ ] Couleurs identiques aux spécifications
- [ ] Espacements respectés (24px, 32px, 40px)
- [ ] Radius cohérents (16px, 20px, 24px)
- [ ] Animations fluides (120ms, cubic-bezier)
- [ ] Focus visible partout
- [ ] Responsive parfait (1440px → 375px)
- [ ] Accessibilité (TAB, ARIA, contraste)

### Tests Responsive
- **1440px** : tout aéré, sidebar pleine, panel droit visible
- **1024px** : panel droit compact mais visible
- **800px** : sidebar compacte, panel droit en dessous
- **700px** : tout stacké, sidebar drawer
- **375px** : mobile parfait, boutons full width

## 🔄 Évolution Future

### Slots Prêts
- **MainContent** : zone centrale vide, prête pour graphiques
- **RankingPanel** : panel droit, prêt pour listes/statistiques
- **Topbar** : actions, prêtes pour nouveaux boutons
- **Sidebar** : navigation, prête pour nouveaux items

### Intégration de Nouveaux Modules
1. Créer le composant dans `/components/modules/`
2. Suivre les spécifications exactes (couleurs, animations, responsive)
3. Ajouter l'ARIA approprié
4. Tester l'accessibilité
5. Documenter dans ce README

## 📞 Support

Pour toute question sur l'implémentation :
- Vérifier les spécifications exactes dans ce document
- Consulter les composants existants comme référence
- Tester systématiquement l'accessibilité
- Respecter les timings d'animation

---

**Note** : Ce dashboard est conçu pour être un starter parfait, prêt à accueillir n'importe quel module métier tout en conservant la cohérence visuelle et l'accessibilité.
