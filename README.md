# Dashboard Clone — Script + Structure-only React Component

This package contains two main deliverables to help you clone the dashboard **structure-only** (no text / no annotations) and to analyze the presentation video frame-by-frame.

## Files
- `analyze_dash_video.py` — Python script that extracts frames (sampled every X ms), computes colors per zone, detects circular nodes, estimates edges density, detects timeline playhead, and generates an SVG wireframe per sampled frame.
- `DashboardClone.jsx` — Single-file React component (structure-only) that renders a faithful layout (header, left panel, main canvas, right sidebar, timeline) as SVG placeholders. Import into any React app.
- `package.json` — minimal package file to run a dev React app (optional).
- `README.md` — this file.

## How to run the analysis script (local)
1. Install Python 3.8+ and pip.
2. Create a virtual env (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate
   # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install opencv-python numpy scikit-learn svgwrite imageio
   ```
4. Run the script:
   ```bash
   python analyze_dash_video.py /path/to/your/video.mp4 --every-ms 200 --outdir ./analysis_out --max-frames 2000
   ```

## How to use the React component
1. Copy `DashboardClone.jsx` into your React project.
2. Import and use:
   ```jsx
   import DashboardClone from './DashboardClone';
   
   function App() {
     return (
       <div>
         <DashboardClone width={1200} height={680} />
       </div>
     );
   }
   ```

## Output from analysis script
- `frames_analysis.csv` — CSV with per-frame data (colors, node counts, playhead position, etc.)
- `frame_XXXXX.svg` — SVG wireframes for each sampled frame
- Console output with progress

## Features
- **Video analysis**: Frame-by-frame extraction with configurable sampling
- **Color detection**: Per-zone color analysis and dominant palette extraction
- **Node detection**: Circular node detection using OpenCV HoughCircles
- **Edge detection**: Canny edge detection for connection density
- **Timeline analysis**: Playhead position detection
- **SVG generation**: Automatic wireframe generation for each frame
- **React component**: Ready-to-use structure-only dashboard clone

## Requirements
- Python 3.8+
- OpenCV, NumPy, scikit-learn, svgwrite, imageio
- React 18+ (for the component)

## Usage Examples

### Basic video analysis
```bash
python analyze_dash_video.py dashboard_video.mp4
```

### High-frequency sampling
```bash
python analyze_dash_video.py dashboard_video.mp4 --every-ms 100 --max-frames 5000
```

### Custom output directory
```bash
python analyze_dash_video.py dashboard_video.mp4 --outdir ./my_analysis
```

## React Component Props
- `width` (number): Component width in pixels (default: 1200)
- `height` (number): Component height in pixels (default: 680)

## Notes
- The analysis script works best with high-quality video files
- Frame sampling every 200ms provides good balance between detail and performance
- The React component is structure-only and requires custom styling for production use
- All coordinates are based on 1365x768 reference resolution