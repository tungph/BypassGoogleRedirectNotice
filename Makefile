# Makefile for the Bypass Google Redirect Notice Chrome Extension
#
# This Makefile provides common development tasks:
# - install: Install project dependencies
# - build: Package the extension into a zip file
# - clean: Remove generated files
# - icons: Generate icon PNG files from script
# - changelog: Open the CHANGELOG.md file for editing
#
# Run 'make help' to see all available commands

# Default target
.PHONY: all
all: build

# Display help information
.PHONY: help
help:
	@echo "Bypass Google Redirect Notice - Chrome Extension"
	@echo ""
	@echo "Available commands:"
	@echo "  make              Build the extension (same as 'make build')"
	@echo "  make install      Install npm dependencies"
	@echo "  make build        Package the extension into a zip file"
	@echo "  make clean        Remove build artifacts (zip files)"
	@echo "  make icons        Generate icon files from source PNG"
	@echo "  make changelog    Open the CHANGELOG.md file for editing"
	@echo ""

# Install dependencies
.PHONY: install
install:
	@echo "Installing npm dependencies..."
	npm install

# Build the extension
.PHONY: build
build:
	@echo "Building extension package..."
	bash ./zip.sh

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning up build artifacts..."
	rm -f *.zip

# Generate icons
.PHONY: icons
icons:
	@echo "Generating icon files..."
	./convert_icons.py  # Python script that resizes icon.png to multiple sizes

# Open CHANGELOG.md for editing
.PHONY: changelog
changelog:
	@echo "Opening CHANGELOG.md for editing..."
	$${EDITOR:-vim} CHANGELOG.md
