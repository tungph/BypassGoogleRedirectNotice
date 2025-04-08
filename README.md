# Bypass Google Redirect Notice

A Chrome extension that automatically bypasses Google's redirect notice pages, taking you directly to your destination URL.

![Extension Icon](src/icon-128.png)

## Features

- Automatically bypasses Google's "The site ahead may be harmful" redirect notice
- Works with search results and other Google services that use redirect links
- Lightweight with minimal performance impact
- No tracking or data collection
- Works in the background without any user interaction required

## Installation

### For Development/Testing

1. Clone this repository or download it as a ZIP file and extract it
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the `src` directory from this project
5. The extension should now be installed and active

### From Packaged Extension

1. Download the latest `.crx` file from the [Releases](https://github.com/username/BypassGoogleRedirectNotice/releases) page
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Drag and drop the `.crx` file onto the extensions page
5. Click "Add extension" when prompted

## How It Works

This extension uses Chrome's `declarativeNetRequest` API to intercept Google's redirect URLs and extract the actual destination URL from the redirect parameters. When you click on a search result or other link that would normally take you through Google's redirect notice, the extension:

1. Detects the redirect URL pattern
2. Extracts the actual destination URL from the `url` parameter
3. Redirects your browser directly to the destination URL, bypassing Google's warning page

The extension operates entirely within your browser and doesn't send any data to external servers.

## Technical Details

The extension is built using:
- Manifest V3 Chrome Extension format
- `declarativeNetRequest` API for URL redirection
- Background service worker for handling the redirection logic

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Extension Not Working

If the extension doesn't seem to be bypassing redirect notices:

1. Make sure the extension is enabled in Chrome's extensions page
2. Check if you have other extensions that might be conflicting with this one
3. Try disabling and re-enabling the extension
4. Ensure you're using a supported Chrome version (Version 88 or later)

### Permission Issues

If Chrome asks for additional permissions:

1. The extension only needs permissions to modify requests to Google domains
2. Review the permissions carefully - they should only be for Google-related URLs
3. If you're uncomfortable with the permissions, you can review the source code to see exactly what the extension does

## Development

To modify or contribute to this extension:

1. Edit the files in the `src` directory
2. Use the included Makefile to simplify development tasks:
   ```
   make install    # Install dependencies
   make icons      # Generate icon files
   make build      # Package the extension
   make clean      # Remove build artifacts
   make help       # Show all available commands
   ```
3. Alternatively, you can use npm directly to generate icons:
   ```
   npm install
   npm run generate-icons
   ```
4. Load the updated extension using Chrome's "Load unpacked" option

### Makefile

This project includes a Makefile to simplify common development tasks. The Makefile provides the following targets:

- `make` or `make build` - Package the extension into a zip file
- `make install` - Install npm dependencies
- `make icons` - Generate icon files from source
- `make clean` - Remove build artifacts (zip files)
- `make help` - Display information about available commands

Run `make help` at any time to see the list of available commands and their descriptions.

## Privacy

This extension:
- Does not collect any user data
- Does not communicate with any external servers
- Does not track browsing history
- Only intercepts and modifies Google redirect URLs

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/username/BypassGoogleRedirectNotice/issues) on GitHub.

