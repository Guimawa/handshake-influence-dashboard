#!/usr/bin/env python3
import csv
import statistics

def analyze_detailed_data():
    # Lire le fichier CSV
    with open('video_analysis_detailed/frames_analysis.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        data = list(reader)
    
    print("=== RAPPORT D'ANALYSE DÉTAILLÉE ===")
    print(f"Nombre total de frames analysées: {len(data)}")
    print(f"Durée totale: {int(data[-1]['timestamp_ms']) / 1000:.1f} secondes")
    print(f"Résolution temporelle: {1000 / (int(data[1]['timestamp_ms']) - int(data[0]['timestamp_ms'])):.1f} FPS effectif")
    print()
    
    # Analyse des nœuds
    nodes_counts = [int(row['nodes_count']) for row in data]
    print("=== DÉTECTION DES NŒUDS ===")
    print(f"Nombre moyen de nœuds: {statistics.mean(nodes_counts):.1f}")
    print(f"Nombre min de nœuds: {min(nodes_counts)}")
    print(f"Nombre max de nœuds: {max(nodes_counts)}")
    print(f"Écart-type: {statistics.stdev(nodes_counts):.1f}")
    
    # Rayon des nœuds
    radii = [int(row['largest_node_r']) for row in data if int(row['largest_node_r']) > 0]
    if radii:
        print(f"Rayon moyen des nœuds: {statistics.mean(radii):.1f} pixels")
        print(f"Rayon min: {min(radii)} pixels")
        print(f"Rayon max: {max(radii)} pixels")
    print()
    
    # Analyse du playhead
    playhead_positions = [int(row['playhead_x']) for row in data if int(row['playhead_x']) > 0]
    print("=== MOUVEMENT DU PLAYHEAD ===")
    if playhead_positions:
        print(f"Position min du playhead: {min(playhead_positions)}px")
        print(f"Position max du playhead: {max(playhead_positions)}px")
        print(f"Amplitude du mouvement: {max(playhead_positions) - min(playhead_positions)}px")
        
        # Calculer la vitesse moyenne
        speeds = []
        for i in range(1, len(playhead_positions)):
            if int(data[i]['playhead_x']) > 0 and int(data[i-1]['playhead_x']) > 0:
                speed = abs(int(data[i]['playhead_x']) - int(data[i-1]['playhead_x']))
                speeds.append(speed)
        if speeds:
            print(f"Vitesse moyenne: {statistics.mean(speeds):.1f}px/frame")
    else:
        print("Aucun playhead détecté")
    print()
    
    # Analyse de la densité des arêtes
    densities = [float(row['edges_density']) for row in data]
    print("=== DENSITÉ DES ARÊTES ===")
    print(f"Densité moyenne: {statistics.mean(densities):.3f}")
    print(f"Densité min: {min(densities):.3f}")
    print(f"Densité max: {max(densities):.3f}")
    print(f"Écart-type: {statistics.stdev(densities):.3f}")
    
    # Trouver le pic de densité
    max_density_idx = densities.index(max(densities))
    print(f"Pic de densité: Frame {data[max_density_idx]['frame_idx']} ({data[max_density_idx]['timestamp_ms']}ms)")
    print()
    
    # Analyse des couleurs par zone
    print("=== ÉVOLUTION DES COULEURS ===")
    zones = ['zone_header_mean', 'zone_left_mean', 'zone_main_mean', 'zone_right_mean', 'zone_timeline_mean']
    zone_names = ['Header', 'Zone Gauche', 'Zone Principale', 'Zone Droite', 'Timeline']
    
    for zone, name in zip(zones, zone_names):
        colors = [row[zone] for row in data]
        unique_colors = list(set(colors))
        print(f"{name}:")
        print(f"  Couleurs distinctes: {len(unique_colors)}")
        print(f"  Première couleur: {colors[0]}")
        print(f"  Dernière couleur: {colors[-1]}")
        
        # Compter les changements
        changes = sum(1 for i in range(1, len(colors)) if colors[i] != colors[i-1])
        print(f"  Changements de couleur: {changes}")
    print()
    
    # Détection des changements significatifs
    print("=== CHANGEMENTS SIGNIFICATIFS ===")
    
    # Changements dans la timeline
    timeline_changes = []
    for i in range(1, len(data)):
        if data[i]['zone_timeline_mean'] != data[i-1]['zone_timeline_mean']:
            timeline_changes.append(i)
    
    print(f"Changements de couleur dans la timeline: {len(timeline_changes)}")
    if timeline_changes:
        print("Frames avec changements:")
        for idx in timeline_changes[:10]:  # Afficher les 10 premiers
            print(f"  Frame {data[idx]['frame_idx']} ({data[idx]['timestamp_ms']}ms): {data[idx]['zone_timeline_mean']}")
        if len(timeline_changes) > 10:
            print(f"  ... et {len(timeline_changes) - 10} autres changements")
    
    # Analyse des patterns de mouvement
    print("\n=== PATTERNS DE MOUVEMENT ===")
    
    # Mouvement des nœuds
    node_positions = []
    for row in data:
        if int(row['largest_node_x']) > 0 and int(row['largest_node_y']) > 0:
            node_positions.append((int(row['largest_node_x']), int(row['largest_node_y'])))
    
    if len(node_positions) > 1:
        x_positions = [pos[0] for pos in node_positions]
        y_positions = [pos[1] for pos in node_positions]
        print(f"Position X moyenne du plus grand nœud: {statistics.mean(x_positions):.1f}px")
        print(f"Position Y moyenne du plus grand nœud: {statistics.mean(y_positions):.1f}px")
        print(f"Amplitude X: {max(x_positions) - min(x_positions)}px")
        print(f"Amplitude Y: {max(y_positions) - min(y_positions)}px")
    
    print("\n=== RECOMMANDATIONS POUR LE CLONE ===")
    print("1. Implémenter un système de nœuds avec 12-14 éléments")
    print("2. Créer une timeline animée avec mouvement fluide du playhead")
    print("3. Utiliser la palette de couleurs sombres détectée")
    print("4. Implémenter des connexions dynamiques entre nœuds")
    print("5. Maintenir la cohérence visuelle des zones")
    print("6. Ajouter des transitions de couleur fluides")
    print("7. Implémenter un système de densité d'arêtes variable")

if __name__ == "__main__":
    analyze_detailed_data()
