#!/usr/bin/env python3
import csv
import matplotlib.pyplot as plt
import numpy as np
import os
from datetime import datetime

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def load_detailed_analysis_data(csv_path):
    """Load detailed analysis data from CSV"""
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

def create_detailed_analysis_plots(data, output_dir):
    """Create detailed analysis plots"""
    
    # Extract data
    frames = [d['frame_idx'] for d in data]
    timestamps = [d['timestamp_ms'] for d in data]
    nodes = [d['nodes_count'] for d in data]
    edges = [d['edges_density'] for d in data]
    playheads = [d['playhead_x'] for d in data if d['playhead_x'] is not None]
    playhead_frames = [d['frame_idx'] for d in data if d['playhead_x'] is not None]
    
    # Create figure with subplots
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('Dashboard Video Analysis - Detailed 30fps Results', fontsize=16)
    
    # Plot 1: Nodes count over time (high resolution)
    ax1.plot(timestamps, nodes, 'b-', linewidth=1, alpha=0.7)
    ax1.plot(timestamps, nodes, 'bo', markersize=2)
    ax1.set_title('Number of Nodes Over Time (30fps)')
    ax1.set_xlabel('Time (ms)')
    ax1.set_ylabel('Nodes Count')
    ax1.grid(True, alpha=0.3)
    ax1.set_ylim(min(nodes)-1, max(nodes)+1)
    
    # Add trend line
    z = np.polyfit(timestamps, nodes, 1)
    p = np.poly1d(z)
    ax1.plot(timestamps, p(timestamps), "r--", alpha=0.8, linewidth=2, label=f'Trend: {z[0]:.4f}x + {z[1]:.2f}')
    ax1.legend()
    
    # Plot 2: Edges density over time (high resolution)
    ax2.plot(timestamps, edges, 'r-', linewidth=1, alpha=0.7)
    ax2.plot(timestamps, edges, 'ro', markersize=2)
    ax2.set_title('Edges Density Over Time (30fps)')
    ax2.set_xlabel('Time (ms)')
    ax2.set_ylabel('Edges Density')
    ax2.grid(True, alpha=0.3)
    
    # Add trend line
    z = np.polyfit(timestamps, edges, 1)
    p = np.poly1d(z)
    ax2.plot(timestamps, p(timestamps), "b--", alpha=0.8, linewidth=2, label=f'Trend: {z[0]:.6f}x + {z[1]:.2f}')
    ax2.legend()
    
    # Plot 3: Playhead position (high resolution)
    if playheads:
        ax3.plot(playhead_frames, playheads, 'g-', linewidth=1, alpha=0.7)
        ax3.plot(playhead_frames, playheads, 'go', markersize=2)
        ax3.set_title('Playhead Position Over Time (30fps)')
        ax3.set_xlabel('Frame Index')
        ax3.set_ylabel('Playhead X Position')
        ax3.grid(True, alpha=0.3)
        
        # Add trend line
        z = np.polyfit(playhead_frames, playheads, 1)
        p = np.poly1d(z)
        ax3.plot(playhead_frames, p(playhead_frames), "r--", alpha=0.8, linewidth=2, label=f'Trend: {z[0]:.2f}x + {z[1]:.2f}')
        ax3.legend()
    else:
        ax3.text(0.5, 0.5, 'No playhead detected', ha='center', va='center', transform=ax3.transAxes)
        ax3.set_title('Playhead Position Over Time (30fps)')
    
    # Plot 4: Color evolution comparison (all zones)
    header_colors = [hex_to_rgb(d['zone_header_mean']) for d in data]
    main_colors = [hex_to_rgb(d['zone_main_mean']) for d in data]
    right_colors = [hex_to_rgb(d['zone_right_mean']) for d in data]
    timeline_colors = [hex_to_rgb(d['zone_timeline_mean']) for d in data]
    
    # Convert to arrays for plotting
    header_r = [c[0] for c in header_colors]
    main_r = [c[0] for c in main_colors]
    right_r = [c[0] for c in right_colors]
    timeline_r = [c[0] for c in timeline_colors]
    
    ax4.plot(timestamps, header_r, 'r-', label='Header R', alpha=0.7, linewidth=1)
    ax4.plot(timestamps, main_r, 'g-', label='Main R', alpha=0.7, linewidth=1)
    ax4.plot(timestamps, right_r, 'b-', label='Right R', alpha=0.7, linewidth=1)
    ax4.plot(timestamps, timeline_r, 'm-', label='Timeline R', alpha=0.7, linewidth=1)
    ax4.set_title('Color Evolution - Red Channel (30fps)')
    ax4.set_xlabel('Time (ms)')
    ax4.set_ylabel('Red Channel Values')
    ax4.legend()
    ax4.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'detailed_analysis_plots.png'), dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"Detailed analysis plots saved to {output_dir}/detailed_analysis_plots.png")

def create_advanced_analysis_plots(data, output_dir):
    """Create advanced analysis plots"""
    
    # Extract data
    timestamps = [d['timestamp_ms'] for d in data]
    nodes = [d['nodes_count'] for d in data]
    edges = [d['edges_density'] for d in data]
    
    # Create advanced figure
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('Advanced Dashboard Analysis - 30fps Insights', fontsize=16)
    
    # Plot 1: Moving average of nodes
    window_size = 30  # 1 second window
    if len(nodes) >= window_size:
        moving_avg_nodes = np.convolve(nodes, np.ones(window_size)/window_size, mode='valid')
        moving_avg_times = timestamps[window_size-1:]
        ax1.plot(moving_avg_times, moving_avg_nodes, 'b-', linewidth=2, label=f'Moving Average ({window_size} frames)')
        ax1.plot(timestamps, nodes, 'b-', alpha=0.3, linewidth=0.5, label='Raw Data')
        ax1.set_title('Nodes Count - Moving Average')
        ax1.set_xlabel('Time (ms)')
        ax1.set_ylabel('Nodes Count')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
    
    # Plot 2: Moving average of edges density
    if len(edges) >= window_size:
        moving_avg_edges = np.convolve(edges, np.ones(window_size)/window_size, mode='valid')
        moving_avg_times = timestamps[window_size-1:]
        ax2.plot(moving_avg_times, moving_avg_edges, 'r-', linewidth=2, label=f'Moving Average ({window_size} frames)')
        ax2.plot(timestamps, edges, 'r-', alpha=0.3, linewidth=0.5, label='Raw Data')
        ax2.set_title('Edges Density - Moving Average')
        ax2.set_xlabel('Time (ms)')
        ax2.set_ylabel('Edges Density')
        ax2.legend()
        ax2.grid(True, alpha=0.3)
    
    # Plot 3: Histogram of nodes distribution
    ax3.hist(nodes, bins=20, alpha=0.7, color='blue', edgecolor='black')
    ax3.set_title('Distribution of Nodes Count')
    ax3.set_xlabel('Nodes Count')
    ax3.set_ylabel('Frequency')
    ax3.grid(True, alpha=0.3)
    
    # Plot 4: Histogram of edges density
    ax4.hist(edges, bins=20, alpha=0.7, color='red', edgecolor='black')
    ax4.set_title('Distribution of Edges Density')
    ax4.set_xlabel('Edges Density')
    ax4.set_ylabel('Frequency')
    ax4.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'advanced_analysis_plots.png'), dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"Advanced analysis plots saved to {output_dir}/advanced_analysis_plots.png")

def create_summary_stats_detailed(data, output_dir):
    """Create detailed summary statistics"""
    
    nodes = [d['nodes_count'] for d in data]
    edges = [d['edges_density'] for d in data]
    playheads = [d for d in data if d['playhead_x'] is not None]
    
    stats = {
        'total_frames': len(data),
        'duration_ms': max([d['timestamp_ms'] for d in data]),
        'fps_effective': len(data) / (max([d['timestamp_ms'] for d in data]) / 1000),
        
        'nodes_mean': np.mean(nodes),
        'nodes_std': np.std(nodes),
        'nodes_min': min(nodes),
        'nodes_max': max(nodes),
        'nodes_median': np.median(nodes),
        
        'edges_mean': np.mean(edges),
        'edges_std': np.std(edges),
        'edges_min': min(edges),
        'edges_max': max(edges),
        'edges_median': np.median(edges),
        
        'playhead_detected': len(playheads),
        'playhead_percentage': (len(playheads) / len(data)) * 100,
        
        'nodes_stability': np.std(nodes) / np.mean(nodes) * 100,
        'edges_trend': np.polyfit(range(len(edges)), edges, 1)[0],
    }
    
    # Create detailed summary text
    summary_text = f"""# Detailed Analysis Summary - 30fps

## Video Analysis Summary
- **Total frames analyzed**: {stats['total_frames']}
- **Video duration**: {stats['duration_ms']/1000:.1f} seconds
- **Effective FPS**: {stats['fps_effective']:.1f}
- **Playhead detected in**: {stats['playhead_detected']} frames ({stats['playhead_percentage']:.1f}%)

## Nodes Detection - Detailed Statistics
- **Average nodes per frame**: {stats['nodes_mean']:.2f}
- **Standard deviation**: {stats['nodes_std']:.2f}
- **Minimum nodes**: {stats['nodes_min']}
- **Maximum nodes**: {stats['nodes_max']}
- **Median nodes**: {stats['nodes_median']:.1f}
- **Stability**: {stats['nodes_stability']:.1f}% (lower = more stable)

## Edges Density - Detailed Statistics
- **Average density**: {stats['edges_mean']:.3f}
- **Standard deviation**: {stats['edges_std']:.3f}
- **Minimum density**: {stats['edges_min']:.3f}
- **Maximum density**: {stats['edges_max']:.3f}
- **Median density**: {stats['edges_median']:.3f}
- **Trend**: {stats['edges_trend']:.6f} (positive = increasing)

## Key Insights from 30fps Analysis

### 1. System Stability
- **Nodes system**: {'Very stable' if stats['nodes_stability'] < 5 else 'Moderately stable' if stats['nodes_stability'] < 10 else 'Variable'}
- **Consistent node count**: {stats['nodes_mean']:.0f} ± {stats['nodes_std']:.1f}
- **Edge complexity**: {'Increasing' if stats['edges_trend'] > 0 else 'Decreasing' if stats['edges_trend'] < 0 else 'Stable'}

### 2. Timeline Interaction
- **Playhead activity**: {stats['playhead_percentage']:.1f}% of frames
- **Interaction level**: {'High' if stats['playhead_percentage'] > 70 else 'Medium' if stats['playhead_percentage'] > 40 else 'Low'}

### 3. Visual Complexity
- **Edge density range**: {stats['edges_min']:.1f} - {stats['edges_max']:.1f}
- **Complexity trend**: {'Growing' if stats['edges_trend'] > 0 else 'Stable' if abs(stats['edges_trend']) < 0.001 else 'Decreasing'}
- **Variability**: {stats['edges_std']:.2f} standard deviation

## Recommendations for Clone Implementation

### 1. Node System
- **Target node count**: {stats['nodes_mean']:.0f} nodes
- **Stability requirement**: Keep nodes stable (variance < {stats['nodes_std']:.1f})
- **Visual consistency**: Maintain consistent node appearance

### 2. Edge System
- **Initial density**: {stats['edges_min']:.1f}
- **Target density**: {stats['edges_max']:.1f}
- **Growth rate**: {stats['edges_trend']:.6f} per frame
- **Animation**: Implement progressive edge complexity

### 3. Timeline System
- **Activity level**: {stats['playhead_percentage']:.1f}% active
- **Movement pattern**: Implement non-linear playhead movement
- **Responsiveness**: Ensure smooth timeline interaction

### 4. Color System
- **Palette stability**: Maintain color consistency across zones
- **Evolution**: Implement subtle color progression
- **Zones**: Keep distinct color zones (header, main, right, timeline)

## Technical Specifications
- **Frame rate**: 30fps effective
- **Analysis resolution**: 33ms intervals
- **Data points**: {stats['total_frames']} frames
- **Accuracy**: High-resolution temporal analysis
"""
    
    with open(os.path.join(output_dir, 'detailed_summary_stats.txt'), 'w') as f:
        f.write(summary_text)
    
    print(f"Detailed summary statistics saved to {output_dir}/detailed_summary_stats.txt")

def main():
    csv_path = 'video_analysis_detailed/frames_analysis.csv'
    output_dir = 'video_analysis_detailed'
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found")
        return
    
    print("Loading detailed analysis data...")
    data = load_detailed_analysis_data(csv_path)
    
    print("Creating detailed analysis plots...")
    create_detailed_analysis_plots(data, output_dir)
    
    print("Creating advanced analysis plots...")
    create_advanced_analysis_plots(data, output_dir)
    
    print("Creating detailed summary statistics...")
    create_summary_stats_detailed(data, output_dir)
    
    print("Detailed analysis visualization complete!")
    print(f"Results saved in: {output_dir}")

if __name__ == '__main__':
    main()
