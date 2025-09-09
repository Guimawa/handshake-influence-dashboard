# 🟦 GUIDE D'INTÉGRATION - DASHBOARD PIXEL-PERFECT

## ZONE 5 : INSTALLATION & CONFIGURATION

### 1. Créer le projet React
```bash
npx create-react-app dashboard-vid
cd dashboard-vid
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configurer Tailwind
Copier le contenu de `tailwind.config.js` dans votre projet.

### 3. Importer les styles
Dans `src/index.css` :
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import './styles/variables.css';
@import './styles/animations.css';
```

## ZONE 6 : STRUCTURE DES COMPOSANTS

### Layout Components
- `src/components/layout/Sidebar.jsx` - Navigation verticale
- `src/components/layout/Topbar.jsx` - Barre supérieure

### Dashboard Components  
- `src/components/dashboard/MainContent.jsx` - Zone centrale
- `src/components/dashboard/RankingPanel.jsx` - Panel droit

### App.jsx (Composition)
```jsx
import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import MainContent from './components/dashboard/MainContent';
import RankingPanel from './components/dashboard/RankingPanel';

function App() {
  return (
    <div className="min-h-screen bg-background text-textMain">
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="flex-1 flex flex-col lg:flex-row gap-8 px-8 py-8">
            <MainContent />
            <RankingPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
```

## ZONE 7 : RESPONSIVE BREAKPOINTS

### Desktop (>1200px)
- Sidebar pleine (90px)
- Panel droit visible à côté
- Gap 32px entre éléments

### Tablet (900px-1200px)  
- Sidebar toujours à gauche
- Panel droit rapetissé
- Gap 24px

### Mobile (700px-900px)
- Sidebar réduite (56px)
- Panel droit passe sous main
- Gap 16px

### Small Mobile (<700px)
- Sidebar devient drawer
- Tout est stacké
- Padding réduit (8px)

## ZONE 8 : ACCESSIBILITÉ

### ARIA Roles
```jsx
<aside role="navigation" aria-label="Barre de navigation principale">
<header role="banner">
<main role="main">
<aside role="complementary" aria-label="Zone latérale">
```

### Navigation Clavier
- Tous les boutons : `tabIndex="0"`
- Focus visible : `focus-visible:ring-2 focus-visible:ring-primary`
- Navigation TAB/Shift+TAB

### Contraste
- Texte principal : #F1F5F9 (contraste 4.5:1)
- Sous-titre : #AAB7C6 (contraste 3:1)
- Focus rings : #3B82F6

## ZONE 9 : AJOUT DE MODULES

### Pour ajouter un nouveau module :

1. **Créer le composant** dans `src/components/dashboard/`
2. **Remplacer le placeholder** dans MainContent ou RankingPanel
3. **Utiliser les classes Tailwind** définies dans la config

### Exemple - Graph Module :
```jsx
// src/components/dashboard/NetworkGraph.jsx
const NetworkGraph = () => {
  return (
    <div className="bg-panel rounded-xl p-8 min-h-[320px]">
      {/* Votre contenu graph ici */}
    </div>
  );
};
```

### Intégration dans MainContent :
```jsx
<MainContent>
  <NetworkGraph />
</MainContent>
```

## ZONE 10 : QA CHECKLIST

### ✅ Couleurs & Espacements
- [ ] Couleurs identiques au design vidéo
- [ ] Espacements respectés (gap-6, p-8, etc.)
- [ ] Radius cohérents (rounded-xl partout)

### ✅ Responsive
- [ ] Testé sur 1440px, 1280px, 900px, 700px, 375px
- [ ] Sidebar drawer en mobile
- [ ] Panel droit sous main <900px

### ✅ Accessibilité
- [ ] Navigation clavier complète
- [ ] ARIA labels sur tous les éléments
- [ ] Focus visible partout
- [ ] Contraste AA respecté

### ✅ Animations
- [ ] Transitions fluides (120ms, 140ms)
- [ ] Cubic-bezier appropriés
- [ ] Hover effects actifs
- [ ] Pas d'animations bloquantes

### ✅ Code
- [ ] Structure modulaire
- [ ] Props pour personnalisation
- [ ] Prêt pour modules futurs
- [ ] Aucune logique métier

## 🚀 PRÊT POUR LA PRODUCTION

La structure est maintenant **pixel-perfect**, **modulaire** et **prête** pour l'ajout de modules futurs. Chaque composant est vide et attend d'être rempli avec du contenu métier spécifique.

**Règle d'or** : Ne jamais ajouter de logique métier dans les composants de layout. Tout doit rester générique et réutilisable.
