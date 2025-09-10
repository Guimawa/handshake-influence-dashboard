#!/usr/bin/env python3
import csv
import os
import statistics

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

def analyze_color_evolution(data):
    """Analyze color evolution across zones"""
    header_colors = [hex_to_rgb(d['zone_header_mean']) for d in data]
    main_colors = [hex_to_rgb(d['zone_main_mean']) for d in data]
    right_colors = [hex_to_rgb(d['zone_right_mean']) for d in data]
    timeline_colors = [hex_to_rgb(d['zone_timeline_mean']) for d in data]
    
    # Calculate RGB averages
    header_avg = {
        'r': statistics.mean([c[0] for c in header_colors]),
        'g': statistics.mean([c[1] for c in header_colors]),
        'b': statistics.mean([c[2] for c in header_colors])
    }
    
    main_avg = {
        'r': statistics.mean([c[0] for c in main_colors]),
        'g': statistics.mean([c[1] for c in main_colors]),
        'b': statistics.mean([c[2] for c in main_colors])
    }
    
    right_avg = {
        'r': statistics.mean([c[0] for c in right_colors]),
        'g': statistics.mean([c[1] for c in right_colors]),
        'b': statistics.mean([c[2] for c in right_colors])
    }
    
    timeline_avg = {
        'r': statistics.mean([c[0] for c in timeline_colors]),
        'g': statistics.mean([c[1] for c in timeline_colors]),
        'b': statistics.mean([c[2] for c in timeline_colors])
    }
    
    return {
        'header': header_avg,
        'main': main_avg,
        'right': right_avg,
        'timeline': timeline_avg
    }

def create_detailed_summary(data, output_dir):
    """Create detailed summary analysis"""
    
    nodes = [d['nodes_count'] for d in data]
    edges = [d['edges_density'] for d in data]
    playheads = [d for d in data if d['playhead_x'] is not None]
    timestamps = [d['timestamp_ms'] for d in data]
    
    # Basic statistics
    stats = {
        'total_frames': len(data),
        'duration_ms': max(timestamps),
        'fps_effective': len(data) / (max(timestamps) / 1000),
        
        'nodes_mean': statistics.mean(nodes),
        'nodes_std': statistics.stdev(nodes) if len(nodes) > 1 else 0,
        'nodes_min': min(nodes),
        'nodes_max': max(nodes),
        'nodes_median': statistics.median(nodes),
        
        'edges_mean': statistics.mean(edges),
        'edges_std': statistics.stdev(edges) if len(edges) > 1 else 0,
        'edges_min': min(edges),
        'edges_max': max(edges),
        'edges_median': statistics.median(edges),
        
        'playhead_detected': len(playheads),
        'playhead_percentage': (len(playheads) / len(data)) * 100,
    }
    
    # Color analysis
    color_analysis = analyze_color_evolution(data)
    
    # Trend analysis
    edges_trend = 0
    if len(edges) > 1:
        x = list(range(len(edges)))
        n = len(edges)
        sum_x = sum(x)
        sum_y = sum(edges)
        sum_xy = sum(x[i] * edges[i] for i in range(n))
        sum_x2 = sum(xi * xi for xi in x)
        edges_trend = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x)
    
    # Create detailed report
    report = f"""# Detailed Analysis Summary - 30fps High Resolution

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
- **Stability**: {(stats['nodes_std'] / stats['nodes_mean'] * 100):.1f}% (lower = more stable)

## Edges Density - Detailed Statistics
- **Average density**: {stats['edges_mean']:.3f}
- **Standard deviation**: {stats['edges_std']:.3f}
- **Minimum density**: {stats['edges_min']:.3f}
- **Maximum density**: {stats['edges_max']:.3f}
- **Median density**: {stats['edges_median']:.3f}
- **Trend**: {edges_trend:.6f} (positive = increasing)

## Color Analysis - Zone Averages

### Header Zone
- **Average RGB**: ({color_analysis['header']['r']:.0f}, {color_analysis['header']['g']:.0f}, {color_analysis['header']['b']:.0f})
- **Hex equivalent**: #{int(color_analysis['header']['r']):02x}{int(color_analysis['header']['g']):02x}{int(color_analysis['header']['b']):02x}

### Main Zone (Canvas)
- **Average RGB**: ({color_analysis['main']['r']:.0f}, {color_analysis['main']['g']:.0f}, {color_analysis['main']['b']:.0f})
- **Hex equivalent**: #{int(color_analysis['main']['r']):02x}{int(color_analysis['main']['g']):02x}{int(color_analysis['main']['b']):02x}

### Right Zone (Sidebar)
- **Average RGB**: ({color_analysis['right']['r']:.0f}, {color_analysis['right']['g']:.0f}, {color_analysis['right']['b']:.0f})
- **Hex equivalent**: #{int(color_analysis['right']['r']):02x}{int(color_analysis['right']['g']):02x}{int(color_analysis['right']['b']):02x}

### Timeline Zone
- **Average RGB**: ({color_analysis['timeline']['r']:.0f}, {color_analysis['timeline']['g']:.0f}, {color_analysis['timeline']['b']:.0f})
- **Hex equivalent**: #{int(color_analysis['timeline']['r']):02x}{int(color_analysis['timeline']['g']):02x}{int(color_analysis['timeline']['b']):02x}

## Key Insights from 30fps Analysis

### 1. System Stability
- **Nodes system**: {'Very stable' if (stats['nodes_std'] / stats['nodes_mean'] * 100) < 5 else 'Moderately stable' if (stats['nodes_std'] / stats['nodes_mean'] * 100) < 10 else 'Variable'}
- **Consistent node count**: {stats['nodes_mean']:.0f} ± {stats['nodes_std']:.1f}
- **Edge complexity**: {'Increasing' if edges_trend > 0 else 'Decreasing' if edges_trend < 0 else 'Stable'}

### 2. Timeline Interaction
- **Playhead activity**: {stats['playhead_percentage']:.1f}% of frames
- **Interaction level**: {'High' if stats['playhead_percentage'] > 70 else 'Medium' if stats['playhead_percentage'] > 40 else 'Low'}

### 3. Visual Complexity
- **Edge density range**: {stats['edges_min']:.1f} - {stats['edges_max']:.1f}
- **Complexity trend**: {'Growing' if edges_trend > 0 else 'Stable' if abs(edges_trend) < 0.001 else 'Decreasing'}
- **Variability**: {stats['edges_std']:.2f} standard deviation

## Recommendations for Clone Implementation

### 1. Node System
- **Target node count**: {stats['nodes_mean']:.0f} nodes
- **Stability requirement**: Keep nodes stable (variance < {stats['nodes_std']:.1f})
- **Visual consistency**: Maintain consistent node appearance

### 2. Edge System
- **Initial density**: {stats['edges_min']:.1f}
- **Target density**: {stats['edges_max']:.1f}
- **Growth rate**: {edges_trend:.6f} per frame
- **Animation**: Implement progressive edge complexity

### 3. Timeline System
- **Activity level**: {stats['playhead_percentage']:.1f}% active
- **Movement pattern**: Implement non-linear playhead movement
- **Responsiveness**: Ensure smooth timeline interaction

### 4. Color System
- **Header**: #{int(color_analysis['header']['r']):02x}{int(color_analysis['header']['g']):02x}{int(color_analysis['header']['b']):02x}
- **Main**: #{int(color_analysis['main']['r']):02x}{int(color_analysis['main']['g']):02x}{int(color_analysis['main']['b']):02x}
- **Right**: #{int(color_analysis['right']['r']):02x}{int(color_analysis['right']['g']):02x}{int(color_analysis['right']['b']):02x}
- **Timeline**: #{int(color_analysis['timeline']['r']):02x}{int(color_analysis['timeline']['g']):02x}{int(color_analysis['timeline']['b']):02x}

## Technical Specifications
- **Frame rate**: 30fps effective
- **Analysis resolution**: 33ms intervals
- **Data points**: {stats['total_frames']} frames
- **Accuracy**: High-resolution temporal analysis

## Data Quality Assessment
- **Completeness**: {stats['total_frames']} frames analyzed
- **Temporal resolution**: {1000/stats['fps_effective']:.1f}ms per frame
- **Node detection**: {stats['playhead_percentage']:.1f}% frames with playhead
- **Color consistency**: All zones analyzed
"""
    
    with open(os.path.join(output_dir, 'detailed_analysis_summary.txt'), 'w') as f:
        f.write(report)
    
    print(f"Detailed analysis summary saved to {output_dir}/detailed_analysis_summary.txt")
    
    # Print key findings
    print("\n" + "="*60)
    print("KEY FINDINGS FROM 30fps ANALYSIS")
    print("="*60)
    print(f"• Total frames analyzed: {stats['total_frames']}")
    print(f"• Average nodes per frame: {stats['nodes_mean']:.1f}")
    print(f"• Node stability: {(stats['nodes_std'] / stats['nodes_mean'] * 100):.1f}%")
    print(f"• Edge density trend: {edges_trend:.4f} per frame")
    print(f"• Playhead activity: {stats['playhead_percentage']:.1f}% of frames")
    print(f"• Color palette: Dark theme with warm undertones")
    print("="*60)

def main():
    csv_path = 'video_analysis_detailed/frames_analysis.csv'
    output_dir = 'video_analysis_detailed'
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found")
        return
    
    print("Loading detailed analysis data...")
    data = load_detailed_analysis_data(csv_path)
    
    print("Creating detailed summary...")
    create_detailed_summary(data, output_dir)
    
    print("Detailed analysis complete!")

if __name__ == '__main__':
    main()
