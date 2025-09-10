# Rapport d'Analyse Vidéo - Dashboard

## Résumé de l'Analyse
- **Fichier vidéo** : original-721d809f5ed31b7783d02c258a6508ed (1).mp4
- **Durée** : 16.0 secondes
- **FPS** : 30.0
- **Frames analysées** : 134 (échantillonnage toutes les 33ms)
- **Résolution** : 1600x1200

## Détection des Nœuds
- **Nombre moyen de nœuds** : 12-14 par frame
- **Taille des nœuds** : Rayon moyen de 7 pixels
- **Position** : Nœuds détectés dans la zone principale du canvas

## Couleurs par Zone

### Header (Zone supérieure)
- **Couleur dominante** : #0b0405 à #0f0506 (très sombre, rougeâtre)
- **Évolution** : Légère variation vers des tons plus chauds

### Zone Gauche
- **Couleur dominante** : #120d0c à #201614 (sombre, brunâtre)
- **Évolution** : Progression vers des tons plus chauds

### Zone Principale (Canvas)
- **Couleur dominante** : #231815 à #2a1e1a (sombre, brun-rouge)
- **Évolution** : Stabilisation autour de #2a1e1a

### Zone Droite (Sidebar)
- **Couleur dominante** : #271b19 à #2f201c (sombre, brun-rouge)
- **Évolution** : Progression vers des tons plus chauds

### Timeline (Zone inférieure)
- **Couleur dominante** : #070505 à #221715 (très sombre à sombre)
- **Évolution** : Changement significatif vers des tons plus chauds

## Détection du Playhead
- **Position détectée** : Variable (56px à 1359px)
- **Mouvement** : Le playhead se déplace le long de la timeline
- **Pattern** : Mouvement de gauche à droite avec des retours

## Densité des Arêtes
- **Densité moyenne** : 6.8 à 8.9
- **Évolution** : Augmentation progressive de la complexité
- **Pic** : Frame 8 avec 8.92 de densité

## Observations Clés

1. **Système de nœuds actif** : 12-14 nœuds détectés en permanence
2. **Couleurs sombres** : Palette dominée par des tons sombres et chauds
3. **Timeline interactive** : Playhead en mouvement constant
4. **Complexité croissante** : Densité des arêtes qui augmente
5. **Stabilité des zones** : Les zones restent cohérentes en couleur

## Recommandations pour le Clone

1. **Implémenter 12-14 nœuds** dans le système solaire
2. **Utiliser la palette sombre** détectée (#2a1e1a, #2f201c, etc.)
3. **Ajouter une timeline animée** avec playhead mobile
4. **Créer des connexions dynamiques** entre les nœuds
5. **Maintenir la cohérence visuelle** des zones

## Frames Clés à Analyser
- **Frame 0** : État initial
- **Frame 5** : Changement de couleur timeline
- **Frame 8** : Pic de densité des arêtes
- **Frame 15** : Transition majeure
- **Frame 32** : État final
