// Bypass Google Redirect Notice
// This script detects Google's redirect URLs and bypasses the redirect notice using declarativeNetRequest

// Function to create rules for declarativeNetRequest API
function createRedirectRules() {
  // Define rules to match Google redirect URLs and redirect to the actual URL
  const redirectRules = [
    {
      id: 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          // Use regexSubstitution to extract the value of the 'q' parameter
          // and use it as the redirect URL
          regexSubstitution: "\\1"
        }
      },
      condition: {
        // Match Google redirect URLs with a regex pattern to capture the destination URL
        regexFilter: "^https?://(?:www\\.)?google\\.com/url\\?(?:[^&]*&)*q=([^&]+)(?:&.*)?$",
        resourceTypes: ["main_frame"]
      }
    },
    // Additional rule for other Google domains
    {
      id: 2,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          regexSubstitution: "\\1"
        }
      },
      condition: {
        regexFilter: "^https?://(?:www\\.)?google\\.[a-z.]+/url\\?(?:[^&]*&)*q=([^&]+)(?:&.*)?$",
        resourceTypes: ["main_frame"]
      }
    }
  ];

  // Update the dynamic rules
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2], // Remove existing rules if any
    addRules: redirectRules
  });
}

// Initialize the extension
function initialize() {
  createRedirectRules();
  console.log("Google Redirect Notice Bypass extension initialized");
}

// Run initialization when the extension is installed or updated
chrome.runtime.onInstalled.addListener(initialize);

// Listen for installed event to show a welcome message
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Bypass Google Redirect Notice has been installed. It will automatically redirect Google URLs.");
  } else if (details.reason === "update") {
    console.log(`Bypass Google Redirect Notice has been updated to version ${chrome.runtime.getManifest().version}`);
  }
});

