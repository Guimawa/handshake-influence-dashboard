#!/usr/bin/env python3
import csv
import matplotlib.pyplot as plt
import numpy as np
import os

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def load_analysis_data(csv_path):
    """Load analysis data from CSV"""
    data = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append({
                'frame_idx': int(row['frame_idx']),
                'timestamp_ms': int(row['timestamp_ms']),
                'nodes_count': int(row['nodes_count']),
                'edges_density': float(row['edges_density']),
                'playhead_x': int(row['playhead_x']) if row['playhead_x'] != '-1' else None,
                'zone_header_mean': row['zone_header_mean'],
                'zone_main_mean': row['zone_main_mean'],
                'zone_right_mean': row['zone_right_mean'],
                'zone_timeline_mean': row['zone_timeline_mean']
            })
    return data

def create_analysis_plots(data, output_dir):
    """Create analysis plots"""
    
    # Extract data
    frames = [d['frame_idx'] for d in data]
    timestamps = [d['timestamp_ms'] for d in data]
    nodes = [d['nodes_count'] for d in data]
    edges = [d['edges_density'] for d in data]
    playheads = [d['playhead_x'] for d in data if d['playhead_x'] is not None]
    playhead_frames = [d['frame_idx'] for d in data if d['playhead_x'] is not None]
    
    # Create figure with subplots
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 10))
    fig.suptitle('Dashboard Video Analysis Results', fontsize=16)
    
    # Plot 1: Nodes count over time
    ax1.plot(timestamps, nodes, 'b-o', markersize=4)
    ax1.set_title('Number of Nodes Over Time')
    ax1.set_xlabel('Time (ms)')
    ax1.set_ylabel('Nodes Count')
    ax1.grid(True, alpha=0.3)
    
    # Plot 2: Edges density over time
    ax2.plot(timestamps, edges, 'r-o', markersize=4)
    ax2.set_title('Edges Density Over Time')
    ax2.set_xlabel('Time (ms)')
    ax2.set_ylabel('Edges Density')
    ax2.grid(True, alpha=0.3)
    
    # Plot 3: Playhead position
    if playheads:
        ax3.plot(playhead_frames, playheads, 'g-o', markersize=4)
        ax3.set_title('Playhead Position Over Time')
        ax3.set_xlabel('Frame Index')
        ax3.set_ylabel('Playhead X Position')
        ax3.grid(True, alpha=0.3)
    else:
        ax3.text(0.5, 0.5, 'No playhead detected', ha='center', va='center', transform=ax3.transAxes)
        ax3.set_title('Playhead Position Over Time')
    
    # Plot 4: Color evolution (simplified)
    header_colors = [hex_to_rgb(d['zone_header_mean']) for d in data]
    main_colors = [hex_to_rgb(d['zone_main_mean']) for d in data]
    
    # Convert to arrays for plotting
    header_r = [c[0] for c in header_colors]
    header_g = [c[1] for c in header_colors]
    header_b = [c[2] for c in header_colors]
    
    ax4.plot(timestamps, header_r, 'r-', label='Header R', alpha=0.7)
    ax4.plot(timestamps, header_g, 'g-', label='Header G', alpha=0.7)
    ax4.plot(timestamps, header_b, 'b-', label='Header B', alpha=0.7)
    ax4.set_title('Color Evolution (Header Zone)')
    ax4.set_xlabel('Time (ms)')
    ax4.set_ylabel('RGB Values')
    ax4.legend()
    ax4.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'analysis_plots.png'), dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"Analysis plots saved to {output_dir}/analysis_plots.png")

def create_summary_stats(data, output_dir):
    """Create summary statistics"""
    
    stats = {
        'total_frames': len(data),
        'avg_nodes': np.mean([d['nodes_count'] for d in data]),
        'max_nodes': max([d['nodes_count'] for d in data]),
        'min_nodes': min([d['nodes_count'] for d in data]),
        'avg_edges_density': np.mean([d['edges_density'] for d in data]),
        'max_edges_density': max([d['edges_density'] for d in data]),
        'min_edges_density': min([d['edges_density'] for d in data]),
        'playhead_detected': len([d for d in data if d['playhead_x'] is not None]),
        'duration_ms': max([d['timestamp_ms'] for d in data])
    }
    
    # Create summary text
    summary_text = f"""# Summary Statistics

## Video Analysis Summary
- **Total frames analyzed**: {stats['total_frames']}
- **Video duration**: {stats['duration_ms']/1000:.1f} seconds
- **Playhead detected in**: {stats['playhead_detected']} frames

## Nodes Detection
- **Average nodes per frame**: {stats['avg_nodes']:.1f}
- **Maximum nodes**: {stats['max_nodes']}
- **Minimum nodes**: {stats['min_nodes']}

## Edges Density
- **Average density**: {stats['avg_edges_density']:.2f}
- **Maximum density**: {stats['max_edges_density']:.2f}
- **Minimum density**: {stats['min_edges_density']:.2f}

## Key Findings
1. The dashboard shows a consistent network of {stats['avg_nodes']:.0f} nodes on average
2. Edge complexity varies significantly (range: {stats['min_edges_density']:.1f} - {stats['max_edges_density']:.1f})
3. Timeline interaction is {'active' if stats['playhead_detected'] > 0 else 'minimal'}
4. The system maintains visual consistency across {stats['total_frames']} analyzed frames
"""
    
    with open(os.path.join(output_dir, 'summary_stats.txt'), 'w') as f:
        f.write(summary_text)
    
    print(f"Summary statistics saved to {output_dir}/summary_stats.txt")

def main():
    csv_path = 'video_analysis/frames_analysis.csv'
    output_dir = 'video_analysis'
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found")
        return
    
    print("Loading analysis data...")
    data = load_analysis_data(csv_path)
    
    print("Creating analysis plots...")
    create_analysis_plots(data, output_dir)
    
    print("Creating summary statistics...")
    create_summary_stats(data, output_dir)
    
    print("Analysis visualization complete!")

if __name__ == '__main__':
    main()
