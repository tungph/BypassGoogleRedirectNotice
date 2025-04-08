#!/bin/bash

# Script to package the Chrome extension into a zip file
# It reads the name and version from manifest.json

# Exit on any error
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
RESET='\033[0m'

# Directory containing extension files
SRC_DIR="src"

# Check if src directory exists
if [ ! -d "$SRC_DIR" ]; then
    echo -e "${RED}Error: $SRC_DIR directory not found. Make sure you're running this script from the project root.${RESET}"
    exit 1
fi

# Check if manifest.json exists
if [ ! -f "$SRC_DIR/manifest.json" ]; then
    echo -e "${RED}Error: manifest.json not found in $SRC_DIR directory.${RESET}"
    exit 1
fi

# Extract name and version from manifest.json
# Using grep and sed to parse JSON (a bit hacky but works for simple cases)
NAME=$(grep -o '"name": "[^"]*"' "$SRC_DIR/manifest.json" | head -1 | sed 's/"name": "\(.*\)"/\1/')
VERSION=$(grep -o '"version": "[^"]*"' "$SRC_DIR/manifest.json" | head -1 | sed 's/"version": "\(.*\)"/\1/')

# Replace spaces with underscores for the filename
FILENAME="${NAME// /_}-v${VERSION}.zip"

echo "Packaging extension: $NAME v$VERSION"

# Create zip file
(
    cd "$SRC_DIR" && 
    zip -r "../$FILENAME" . -x "*.DS_Store" "*.git*" && 
    echo -e "${GREEN}Successfully created $FILENAME${RESET}" && 
    echo -e "${GREEN}Package is ready for distribution!${RESET}"
) || {
    echo -e "${RED}Error: Failed to create zip file.${RESET}"
    exit 1
}

# Print the path to the zip file
echo ""
echo "Zip file location: $(pwd)/$FILENAME"
echo ""

# Make the file executable
chmod +x "$0"

exit 0

