document.addEventListener("DOMContentLoaded", function () {
  // Check for microphone permission
  navigator.permissions.query({ name: "microphone" }).then(function (result) {
    if (result.state === "granted") {
      checkPermissions();
    }
  });

  // Check pop-up permissions
  function checkPopupsAllowed() {
    let testPopup = window.open("", "", "width=100,height=100");
    if (
      !testPopup ||
      testPopup.closed ||
      typeof testPopup.closed == "undefined"
    ) {
      return false; // Popups are blocked
    } else {
      testPopup.close();
      return true; // Popups are allowed
    }
  }

  // Function to check if both permissions are allowed
  function checkPermissions() {
    navigator.permissions.query({ name: "microphone" }).then(function (result) {
      const popupsAllowed = checkPopupsAllowed();

      // If both microphone and pop-ups are allowed, hide loading screen
      if (result.state === "granted" && popupsAllowed) {
        hideLoadingScreen();
      }
    });
  }

  // Function to hide the loading screen
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "none"; // Hide the loading screen
  }

  // Call checkPermissions on page load
  checkPermissions();
});
