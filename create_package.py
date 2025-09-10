#!/usr/bin/env python3
import os
import zipfile
import shutil

def create_dashboard_package():
    """Create a ZIP package with all dashboard clone files"""
    
    # Files to include in the package
    files_to_include = [
        'analyze_dash_video.py',
        'DashboardClone.jsx', 
        'package.json',
        'requirements.txt',
        'vite.config.js',
        'App.jsx',
        'App.css',
        'main.jsx',
        'index.html',
        'README.md'
    ]
    
    # Create ZIP file
    zip_filename = 'dashboard_clone_package.zip'
    
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in files_to_include:
            if os.path.exists(file):
                zipf.write(file)
                print(f"Added {file} to package")
            else:
                print(f"Warning: {file} not found")
    
    print(f"\nPackage created: {zip_filename}")
    print(f"Package size: {os.path.getsize(zip_filename) / 1024:.1f} KB")
    
    return zip_filename

if __name__ == '__main__':
    create_dashboard_package()
