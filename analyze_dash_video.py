#!/usr/bin/env python3
# analyze_dash_video.py
# Usage:
#   python analyze_dash_video.py /path/to/video.mp4 --every-ms 200 --outdir ./analysis_out --max-frames 2000
import os, sys, argparse, math, csv
import cv2
import numpy as np
try:
    from sklearn.cluster import KMeans
except ImportError:
    print("Warning: scikit-learn not available, using basic color analysis")
    KMeans = None
import svgwrite
import imageio

def mean_hex(img):
    m = img.reshape(-1,3).mean(axis=0).astype(int)
    return '#%02x%02x%02x' % tuple(m.tolist())

def dominant_colors(img, k=6):
    h,w = img.shape[:2]
    sample = img.reshape(-1,3)
    n = min(len(sample), 20000)
    if n <= 0:
        return []
    
    if KMeans is None:
        # Fallback: simple color sampling
        inds = np.random.choice(len(sample), min(n, 1000), replace=False)
        sample = sample[inds]
        # Group similar colors manually
        colors = []
        for i in range(0, len(sample), len(sample)//k):
            if i < len(sample):
                colors.append(sample[i])
        return ['#%02x%02x%02x' % tuple(c.astype(int).tolist()) for c in colors]
    
    inds = np.random.choice(len(sample), n, replace=False)
    sample = sample[inds].astype(float)/255.0
    kmeans = KMeans(n_clusters=k, random_state=0, n_init=4).fit(sample)
    cols = (kmeans.cluster_centers_ * 255).astype(int)
    hexs = ['#%02x%02x%02x' % tuple(c.tolist()) for c in cols]
    return hexs

def detect_circles_gray(gray, dp=1.2, minDist=20, param1=60, param2=22, minRadius=6, maxRadius=200):
    circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, dp=dp, minDist=minDist,
                                param1=param1, param2=param2,
                                minRadius=minRadius, maxRadius=maxRadius)
    if circles is None:
        return []
    return np.round(circles[0]).astype(int).tolist()

def find_playhead_x(timeline_img):
    gray = cv2.cvtColor(timeline_img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    col_sums = edges.sum(axis=0)
    if col_sums.max() < 10:
        return -1
    x = int(np.argmax(col_sums))
    return x

def process_frame(frame):
    h,w = frame.shape[:2]
    ref_w, ref_h = 1365, 768
    scale_w = w / ref_w; scale_h = h / ref_h
    header_h = int(72 * scale_h)
    left_x = int(24 * scale_w); left_w = int(258 * scale_w)
    main_x = left_x + left_w; main_w = int(576 * scale_w)
    right_x = int(858 * scale_w); right_w = int(360 * scale_w)
    timeline_h = int(148 * scale_h)

    z_header = frame[0:header_h, 0:w]
    z_left = frame[header_h:h - timeline_h, left_x:left_x + left_w]
    z_main = frame[header_h:h - timeline_h, main_x:main_x + main_w]
    z_right = frame[header_h:h - timeline_h, right_x:right_x + right_w]
    z_timeline = frame[h - timeline_h:h, 0:w]

    out = {}
    out['frame_w'], out['frame_h'] = w, h
    out['zone_header_mean'] = mean_hex(z_header) if z_header.size else '#000000'
    out['zone_left_mean'] = mean_hex(z_left) if z_left.size else '#000000'
    out['zone_main_mean'] = mean_hex(z_main) if z_main.size else '#000000'
    out['zone_right_mean'] = mean_hex(z_right) if z_right.size else '#000000'
    out['zone_timeline_mean'] = mean_hex(z_timeline) if z_timeline.size else '#000000'

    gray_main = cv2.cvtColor(z_main, cv2.COLOR_BGR2GRAY)
    gray_blur = cv2.medianBlur(gray_main, 5)
    circles = detect_circles_gray(gray_blur, minRadius=6, maxRadius=int(min(z_main.shape)/2))
    out['nodes_count'] = len(circles)
    if len(circles):
        circles_global = [(c[0] + main_x, c[1] + header_h, c[2]) for c in circles]
        circles_global.sort(key=lambda x: x[2], reverse=True)
        lx,ly,lr = circles_global[0]
        out['largest_node_x'], out['largest_node_y'], out['largest_node_r'] = int(lx), int(ly), int(lr)
    else:
        out['largest_node_x'] = out['largest_node_y'] = out['largest_node_r'] = -1

    edges = cv2.Canny(gray_main, 40, 120)
    out['edges_density'] = float(edges.sum()) / (z_main.shape[0]*z_main.shape[1]) if z_main.size else 0.0

    play_x = find_playhead_x(z_timeline)
    out['playhead_x'] = int(play_x) if play_x>=0 else -1

    pal = dominant_colors(z_main, k=6) if z_main.size else []
    out['dominant_palette'] = ';'.join(pal)
    return out, (left_x, header_h, main_x, main_w, right_x, right_w, timeline_h, h)

def make_svg_frame(svg_path, frame_w, frame_h, main_circles_global, playhead_x, coords):
    left_x, header_h, main_x, main_w, right_x, right_w, timeline_h, h = coords
    dwg = svgwrite.Drawing(svg_path, size=(frame_w, frame_h))
    dwg.add(dwg.rect((0,0),(frame_w, header_h), fill='none', stroke='#00FF00', stroke_dasharray='6,4'))
    dwg.add(dwg.rect((left_x, header_h),(left_w, h-header_h-timeline_h), fill='none', stroke='#FFAA00', stroke_dasharray='6,4'))
    dwg.add(dwg.rect((main_x, header_h),(main_w, h-header_h-timeline_h), fill='none', stroke='#00AEEF', stroke_dasharray='6,4'))
    dwg.add(dwg.rect((right_x, header_h),(right_w, h-header_h-timeline_h), fill='none', stroke='#FF00AA', stroke_dasharray='6,4'))
    dwg.add(dwg.rect((0, h-timeline_h),(frame_w, timeline_h), fill='none', stroke='#AA00FF', stroke_dasharray='6,4'))
    for (cx,cy,r) in main_circles_global:
        dwg.add(dwg.circle(center=(cx, cy), r=r, fill='none', stroke='#00AEEF', stroke_width=2))
    if playhead_x and playhead_x>0:
        dwg.add(dwg.rect(insert=(playhead_x, h-timeline_h), size=(2, int(timeline_h/2)), fill='#00FF00'))
    dwg.save()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('video', help='path to video')
    parser.add_argument('--every-ms', type=int, default=33, help='sample every X milliseconds')
    parser.add_argument('--outdir', default='analysis_out', help='output directory')
    parser.add_argument('--max-frames', type=int, default=2000, help='max frames to process')
    args = parser.parse_args()

    os.makedirs(args.outdir, exist_ok=True)
    reader = imageio.get_reader(args.video, 'ffmpeg')
    meta = reader.get_meta_data()
    fps = meta.get('fps', 30)
    duration = meta.get('duration', None)
    interval_frames = max(1, int(round(fps * (args.every_ms/1000.0))))
    print("video fps:", fps, "interval_frames:", interval_frames)

    csv_path = os.path.join(args.outdir, 'frames_analysis.csv')
    csv_file = open(csv_path, 'w', newline='', encoding='utf-8')
    writer = csv.writer(csv_file)
    header = ['frame_idx','timestamp_ms','frame_w','frame_h',
              'zone_header_mean','zone_left_mean','zone_main_mean','zone_right_mean','zone_timeline_mean',
              'nodes_count','largest_node_x','largest_node_y','largest_node_r','edges_density','playhead_x','dominant_palette','notes']
    writer.writerow(header)

    frame_idx = 0
    processed = 0
    for i,frame in enumerate(reader):
        if processed >= args.max_frames: break
        if (i % interval_frames) != 0:
            continue
        ts_ms = int((i / fps) * 1000)
        out, coords = process_frame(frame)
        circles_global = []
        if out['largest_node_r']>0:
            circles_global.append((out['largest_node_x'], out['largest_node_y'], out['largest_node_r']))
        svg_path = os.path.join(args.outdir, f'frame_{frame_idx:05d}.svg')
        try:
            make_svg_frame(svg_path, frame.shape[1], frame.shape[0], circles_global, out['playhead_x'], coords)
        except Exception:
            pass
        row = [frame_idx, ts_ms, out['frame_w'], out['frame_h'],
               out['zone_header_mean'], out['zone_left_mean'], out['zone_main_mean'], out['zone_right_mean'], out['zone_timeline_mean'],
               out['nodes_count'], out['largest_node_x'], out['largest_node_y'], out['largest_node_r'], out['edges_density'], out['playhead_x'], out['dominant_palette'], '']
        writer.writerow(row)
        frame_idx += 1
        processed += 1
    csv_file.close()
    print("done. output:", args.outdir)

if __name__=='__main__':
    main()
