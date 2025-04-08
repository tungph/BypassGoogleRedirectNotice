# Privacy Policy for Bypass Google Redirect Notice

## Introduction

This Privacy Policy describes how the "Bypass Google Redirect Notice" Chrome extension handles data. We are committed to protecting your privacy and being transparent about our practices.

## Data Collection and Usage

**We do not collect, store, or transmit any user data.**

This extension:
- Does not collect any personal information
- Does not track your browsing history
- Does not monitor which websites you visit
- Does not use cookies or local storage
- Does not contain analytics or tracking code
- Does not transmit any data to external servers

## How the Extension Works

The extension operates entirely within your browser by:
1. Detecting when you click on a Google search result link
2. Intercepting Google's redirect URL before you are sent to the redirect notice page
3. Extracting the actual destination URL from Google's redirect parameters
4. Redirecting your browser directly to the destination website

All of this processing happens locally on your device using Chrome's declarativeNetRequest API.

## Permissions

The extension requires the following permissions:

1. **webRequest** and **declarativeNetRequest**: These permissions are necessary to identify Google's redirect URLs and modify the browser's request to bypass the redirect notice page.

2. **Host Permissions** (*://www.google.com/* and *://google.com/*): These permissions allow the extension to operate only on Google domains where redirect notices appear.

These permissions are used solely for the purpose of bypassing Google redirect notices. They are not used to access, collect, or transmit any user data.

## Third-Party Services

This extension does not use any third-party services, APIs (other than Chrome's extension APIs), or libraries.

## Data Retention and Deletion

Since no user data is collected, there is no data retention or deletion policy. Uninstalling the extension will remove it completely from your browser with no data remnants.

## Privacy Policy Changes

If this privacy policy changes in the future, we will update this document and the version number. However, the core commitment to not collecting any user data will remain unchanged.

## Contact Information

If you have any questions or concerns about this privacy policy or the extension, please open an issue on our GitHub repository.

## Effective Date

This privacy policy is effective as of April 8, 2025.

---

Last updated: April 8, 2025
Version: 1.0

