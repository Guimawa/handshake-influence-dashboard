#!/usr/bin/env python3
import pandas as pd
import numpy as np

# Lire les données détaillées
df = pd.read_csv('video_analysis_detailed/frames_analysis.csv')

print("=== ANALYSE DÉTAILLÉE DE LA VIDÉO ===")
print(f"Nombre total de frames analysées: {len(df)}")
print(f"Durée totale: {df['timestamp_ms'].iloc[-1] / 1000:.1f} secondes")
print(f"Intervalle moyen: {df['timestamp_ms'].diff().mean():.1f}ms")
print()

# Analyse des nœuds
print("=== DÉTECTION DES NŒUDS ===")
print(f"Nombre moyen de nœuds: {df['nodes_count'].mean():.1f}")
print(f"Nombre min de nœuds: {df['nodes_count'].min()}")
print(f"Nombre max de nœuds: {df['nodes_count'].max()}")
print(f"Rayon moyen des nœuds: {df['largest_node_r'].mean():.1f} pixels")
print()

# Analyse du playhead
print("=== MOUVEMENT DU PLAYHEAD ===")
playhead_data = df[df['playhead_x'] > 0]
if len(playhead_data) > 0:
    print(f"Position min du playhead: {playhead_data['playhead_x'].min()}px")
    print(f"Position max du playhead: {playhead_data['playhead_x'].max()}px")
    print(f"Amplitude du mouvement: {playhead_data['playhead_x'].max() - playhead_data['playhead_x'].min()}px")
    print(f"Vitesse moyenne: {playhead_data['playhead_x'].diff().abs().mean():.1f}px/frame")
else:
    print("Aucun playhead détecté")
print()

# Analyse de la densité des arêtes
print("=== DENSITÉ DES ARÊTES ===")
print(f"Densité moyenne: {df['edges_density'].mean():.3f}")
print(f"Densité min: {df['edges_density'].min():.3f}")
print(f"Densité max: {df['edges_density'].max():.3f}")
print(f"Écart-type: {df['edges_density'].std():.3f}")
print()

# Analyse des couleurs par zone
print("=== ÉVOLUTION DES COULEURS ===")
zones = ['zone_header_mean', 'zone_left_mean', 'zone_main_mean', 'zone_right_mean', 'zone_timeline_mean']
for zone in zones:
    colors = df[zone].unique()
    print(f"{zone}: {len(colors)} couleurs distinctes détectées")
    print(f"  Première couleur: {colors[0]}")
    print(f"  Dernière couleur: {colors[-1]}")
print()

# Détection des changements significatifs
print("=== CHANGEMENTS SIGNIFICATIFS ===")
# Changements de couleur dans la timeline
timeline_changes = df[df['zone_timeline_mean'] != df['zone_timeline_mean'].shift(1)]
print(f"Changements de couleur dans la timeline: {len(timeline_changes)}")
if len(timeline_changes) > 0:
    print("Frames avec changements:")
    for idx, row in timeline_changes.iterrows():
        print(f"  Frame {row['frame_idx']} ({row['timestamp_ms']}ms): {row['zone_timeline_mean']}")

# Pic de densité des arêtes
max_density_idx = df['edges_density'].idxmax()
print(f"Pic de densité des arêtes: Frame {df.loc[max_density_idx, 'frame_idx']} ({df.loc[max_density_idx, 'timestamp_ms']}ms) = {df.loc[max_density_idx, 'edges_density']:.3f}")

print()
print("=== RECOMMANDATIONS POUR LE CLONE ===")
print("1. Implémenter un système de nœuds avec 12-14 éléments")
print("2. Créer une timeline animée avec mouvement fluide du playhead")
print("3. Utiliser la palette de couleurs sombres détectée")
print("4. Implémenter des connexions dynamiques entre nœuds")
print("5. Maintenir la cohérence visuelle des zones")
