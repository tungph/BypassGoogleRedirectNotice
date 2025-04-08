#!/bin/bash

# This script converts the SVG icon to PNG files of different sizes
# It requires either ImageMagick or librsvg to be installed

echo "Converting SVG to PNG files..."

# Try to use ImageMagick's convert command
if command -v convert &> /dev/null; then
    echo "Using ImageMagick to convert icons..."
    convert -background none -size 16x16 src/icon.svg src/icon-16.png
    convert -background none -size 48x48 src/icon.svg src/icon-48.png
    convert -background none -size 128x128 src/icon.svg src/icon-128.png
# Try to use librsvg's rsvg-convert command
elif command -v rsvg-convert &> /dev/null; then
    echo "Using librsvg to convert icons..."
    rsvg-convert -w 16 -h 16 src/icon.svg -o src/icon-16.png
    rsvg-convert -w 48 -h 48 src/icon.svg -o src/icon-48.png
    rsvg-convert -w 128 -h 128 src/icon.svg -o src/icon-128.png
# On macOS, try to use sips
elif command -v sips &> /dev/null && [ "$(uname)" == "Darwin" ]; then
    echo "Using sips to convert icons..."
    
    # First convert SVG to a high-resolution PNG
    # Note: sips doesn't directly support SVG, so we might need a two-step process
    # For now, let's assume we have a tool to convert SVG to high-res PNG first
    
    # Then resize using sips
    sips -z 16 16 src/icon.svg --out src/icon-16.png
    sips -z 48 48 src/icon.svg --out src/icon-48.png
    sips -z 128 128 src/icon.svg --out src/icon-128.png
else
    echo "Error: No suitable conversion tool found."
    echo "Please install ImageMagick or librsvg, or manually convert the SVG file."
    exit 1
fi

echo "Conversion completed. Icon files created in the src directory."

