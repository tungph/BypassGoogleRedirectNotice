#!/usr/bin/env python3
"""
Script to resize the icon.png file to different sizes.
This script tries to avoid external dependencies where possible.
"""

import os
import sys
import platform
import subprocess
from pathlib import Path

# Define the icon sizes to generate
ICON_SIZES = [16, 48, 128]
SOURCE_ICON = "src/icon.png"

def print_separator():
    """Print a separator line for better readability."""
    print("-" * 70)

def resize_with_pillow():
    """
    Attempt to resize the icon using Pillow library.
    Returns True if successful, False if Pillow is not available.
    """
    try:
        from PIL import Image
        print("Using Pillow for high-quality image resizing...")
        
        # Open the source image
        source_path = Path(SOURCE_ICON)
        if not source_path.exists():
            print(f"Error: Source icon not found at {SOURCE_ICON}")
            return False
            
        source_img = Image.open(SOURCE_ICON)
        
        # Resize to each target size
        for size in ICON_SIZES:
            output_path = f"src/icon-{size}.png"
            # Use high-quality resizing
            resized_img = source_img.resize((size, size), Image.LANCZOS)
            resized_img.save(output_path)
            print(f"Created {output_path}")
            
        return True
    except ImportError:
        print("Pillow library not found. Falling back to system commands.")
        return False
    except Exception as e:
        print(f"Error using Pillow: {e}")
        return False

def resize_with_sips():
    """
    Attempt to resize the icon using macOS sips command.
    Returns True if successful, False otherwise.
    """
    if platform.system() != "Darwin":
        return False
        
    print("Using macOS sips command for image resizing...")
    
    success = True
    for size in ICON_SIZES:
        output_path = f"src/icon-{size}.png"
        try:
            subprocess.run(
                ["sips", "-z", str(size), str(size), SOURCE_ICON, "--out", output_path],
                check=True,
                stderr=subprocess.PIPE,
                stdout=subprocess.PIPE
            )
            print(f"Created {output_path}")
        except subprocess.CalledProcessError as e:
            print(f"Error using sips: {e}")
            success = False
            
    return success

def resize_with_imagemagick():
    """
    Attempt to resize the icon using ImageMagick.
    Tries both 'magick' (newer versions) and 'convert' (older versions) commands.
    Returns True if successful, False otherwise.
    """
    # Check for the 'magick' command (newer ImageMagick)
    magick_cmd = None
    
    # Try the newer 'magick' command first
    try:
        subprocess.run(["magick", "--version"], 
                      check=True, 
                      stdout=subprocess.PIPE, 
                      stderr=subprocess.PIPE)
        magick_cmd = "magick"
        print("Using ImageMagick (magick command) for image resizing...")
    except (subprocess.CalledProcessError, FileNotFoundError):
        # Try the older 'convert' command
        try:
            subprocess.run(["convert", "--version"], 
                          check=True, 
                          stdout=subprocess.PIPE, 
                          stderr=subprocess.PIPE)
            magick_cmd = "convert"
            print("Using ImageMagick (convert command) for image resizing...")
        except (subprocess.CalledProcessError, FileNotFoundError):
            return False
    
    # If we have a valid command, use it to resize the images
    if magick_cmd:
        success = True
        for size in ICON_SIZES:
            output_path = f"src/icon-{size}.png"
            try:
                # Use high-quality resize settings
                subprocess.run(
                    [magick_cmd, SOURCE_ICON, 
                     "-resize", f"{size}x{size}", 
                     "-colorspace", "sRGB", 
                     "-depth", "8", 
                     output_path],
                    check=True,
                    stderr=subprocess.PIPE,
                    stdout=subprocess.PIPE
                )
                print(f"Created {output_path}")
            except subprocess.CalledProcessError as e:
                print(f"Error using {magick_cmd}: {e}")
                success = False
                
        return success
    
    return False

def check_source_icon():
    """Check if the source icon exists."""
    if not os.path.exists(SOURCE_ICON):
        print(f"Error: Source icon not found at {SOURCE_ICON}")
        print("Please make sure the icon.png file exists in the src directory.")
        return False
    return True

def main():
    """Main function to resize the icon."""
    print_separator()
    print("Icon Resizing Script")
    print_separator()
    
    # Check if source icon exists
    if not check_source_icon():
        return 1
    
    # Try different methods in order of preference
    if resize_with_pillow():
        pass
    elif resize_with_sips():
        pass
    elif resize_with_imagemagick():
        pass
    else:
        print_separator()
        print("Error: Could not find any suitable image resizing tools.")
        print("\nSuggestions:")
        print("1. Install Pillow for high-quality Python-based resizing:")
        print("   pip install Pillow")
        print("\n2. Install ImageMagick:")
        print("   - macOS: brew install imagemagick")
        print("   - Linux: apt install imagemagick or similar")
        print("   - Windows: Download from https://imagemagick.org/")
        print_separator()
        return 1
    
    print_separator()
    print("Resizing completed. Icon files created in the src directory.")
    print_separator()
    return 0

if __name__ == "__main__":
    sys.exit(main())

