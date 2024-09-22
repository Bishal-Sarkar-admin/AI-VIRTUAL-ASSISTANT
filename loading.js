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

  // Function to hide the loading screen with animation
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("hidden"); // Add 'hidden' class to trigger the transition

    // After transition, set display to none
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500); // Match the duration of the CSS transition (0.5s)
  }

  // Call checkPermissions on page load
  checkPermissions();
});

// Close button functionality with speech recognition starting
let close = document.querySelector("#close");
let loadingScreen = document.querySelector("#loading-screen");
close.addEventListener("click", () => {
  loadingScreen.classList.add("hidden"); // Trigger fade-out animation

  // After transition, hide the element completely
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500); // 500ms to match CSS transition duration
});
