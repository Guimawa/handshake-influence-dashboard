#!/usr/bin/env python3
import os, sys, argparse, csv
import cv2
import numpy as np

def mean_hex(img):
    if img.size == 0:
        return '#000000'
    m = img.reshape(-1,3).mean(axis=0).astype(int)
    return '#%02x%02x%02x' % tuple(m.tolist())

def detect_circles_gray(gray, dp=1.2, minDist=20, param1=60, param2=22, minRadius=6, maxRadius=200):
    try:
        circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, dp=dp, minDist=minDist,
                                    param1=param1, param2=param2,
                                    minRadius=minRadius, maxRadius=maxRadius)
        if circles is None:
            return []
        return np.round(circles[0]).astype(int).tolist()
    except:
        return []

def find_playhead_x(timeline_img):
    try:
        gray = cv2.cvtColor(timeline_img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        col_sums = edges.sum(axis=0)
        if col_sums.max() < 10:
            return -1
        x = int(np.argmax(col_sums))
        return x
    except:
        return -1

def process_frame(frame):
    h,w = frame.shape[:2]
    ref_w, ref_h = 1365, 768
    scale_w = w / ref_w; scale_h = h / ref_h
    header_h = int(72 * scale_h)
    left_x = int(24 * scale_w); left_w = int(258 * scale_w)
    main_x = left_x + left_w; main_w = int(576 * scale_w)
    right_x = int(858 * scale_w); right_w = int(360 * scale_w)
    timeline_h = int(148 * scale_h)

    z_header = frame[0:header_h, 0:w] if header_h > 0 else np.array([])
    z_left = frame[header_h:h - timeline_h, left_x:left_x + left_w] if left_w > 0 else np.array([])
    z_main = frame[header_h:h - timeline_h, main_x:main_x + main_w] if main_w > 0 else np.array([])
    z_right = frame[header_h:h - timeline_h, right_x:right_x + right_w] if right_w > 0 else np.array([])
    z_timeline = frame[h - timeline_h:h, 0:w] if timeline_h > 0 else np.array([])

    out = {}
    out['frame_w'], out['frame_h'] = w, h
    out['zone_header_mean'] = mean_hex(z_header) if z_header.size else '#000000'
    out['zone_left_mean'] = mean_hex(z_left) if z_left.size else '#000000'
    out['zone_main_mean'] = mean_hex(z_main) if z_main.size else '#000000'
    out['zone_right_mean'] = mean_hex(z_right) if z_right.size else '#000000'
    out['zone_timeline_mean'] = mean_hex(z_timeline) if z_timeline.size else '#000000'

    if z_main.size > 0:
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
    else:
        out['nodes_count'] = 0
        out['largest_node_x'] = out['largest_node_y'] = out['largest_node_r'] = -1
        out['edges_density'] = 0.0

    play_x = find_playhead_x(z_timeline) if z_timeline.size > 0 else -1
    out['playhead_x'] = int(play_x) if play_x>=0 else -1

    out['dominant_palette'] = ''  # Simplified for now
    return out

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('video', help='path to video')
    parser.add_argument('--every-ms', type=int, default=200, help='sample every X milliseconds')
    parser.add_argument('--outdir', default='analysis_out', help='output directory')
    parser.add_argument('--max-frames', type=int, default=2000, help='max frames to process')
    args = parser.parse_args()

    os.makedirs(args.outdir, exist_ok=True)
    
    # Use OpenCV for video reading
    cap = cv2.VideoCapture(args.video)
    if not cap.isOpened():
        print(f"Error: Could not open video {args.video}")
        return
    
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = total_frames / fps if fps > 0 else 0
    
    interval_frames = max(1, int(round(fps * (args.every_ms/1000.0))))
    print(f"Video fps: {fps}, duration: {duration:.1f}s, interval_frames: {interval_frames}")

    csv_path = os.path.join(args.outdir, 'frames_analysis.csv')
    csv_file = open(csv_path, 'w', newline='', encoding='utf-8')
    writer = csv.writer(csv_file)
    header = ['frame_idx','timestamp_ms','frame_w','frame_h',
              'zone_header_mean','zone_left_mean','zone_main_mean','zone_right_mean','zone_timeline_mean',
              'nodes_count','largest_node_x','largest_node_y','largest_node_r','edges_density','playhead_x','dominant_palette','notes']
    writer.writerow(header)

    frame_idx = 0
    processed = 0
    frame_count = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        if processed >= args.max_frames:
            break
            
        if (frame_count % interval_frames) == 0:
            ts_ms = int((frame_count / fps) * 1000) if fps > 0 else frame_count * 33
            out = process_frame(frame)
            
            row = [frame_idx, ts_ms, out['frame_w'], out['frame_h'],
                   out['zone_header_mean'], out['zone_left_mean'], out['zone_main_mean'], out['zone_right_mean'], out['zone_timeline_mean'],
                   out['nodes_count'], out['largest_node_x'], out['largest_node_y'], out['largest_node_r'], out['edges_density'], out['playhead_x'], out['dominant_palette'], '']
            writer.writerow(row)
            
            # Save frame as image for analysis
            frame_path = os.path.join(args.outdir, f'frame_{frame_idx:05d}.jpg')
            cv2.imwrite(frame_path, frame)
            
            frame_idx += 1
            processed += 1
            
            if processed % 10 == 0:
                print(f"Processed {processed} frames...")
        
        frame_count += 1
    
    cap.release()
    csv_file.close()
    print(f"Done. Output: {args.outdir}")
    print(f"Total frames processed: {processed}")

if __name__=='__main__':
    main()
