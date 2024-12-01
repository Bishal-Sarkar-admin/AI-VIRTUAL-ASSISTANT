// Function: Greet the user based on the time of day
function wishMe() {
  let date = new Date();
  let hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    speak("Good Morning, Sir!");
  } else if (hour >= 12 && hour < 18) {
    speak("Good Afternoon, Sir!");
  } else if (hour >= 18 && hour < 22) {
    speak("Good Evening, Sir!");
  } else {
    speak("Good Night, Sir!");
  }
}

// Function: Speak text using the SpeechSynthesis API
function speak(text) {
  console.log(text);
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel(); // Clears any ongoing speech
    let text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1; // Speech rate
    text_speak.pitch = 1; // Speech pitch
    text_speak.volume = 1; // Volume level
    text_speak.lang = "en-GB"; // Language setting

    text_speak.onstart = () => {
      btn.style.display = "none";
      voice.style.display = "block"; // Show the voice indicator
    };

    text_speak.onend = () => {
      btn.style.display = "flex";
      voice.style.display = "none"; // Hide the voice indicator
      recognition.start(); // Restart recognition for continuous commands
    };

    text_speak.onerror = () => {
      btn.style.display = "flex";
      voice.style.display = "none"; // Hide the voice indicator in case of errors
    };

    window.speechSynthesis.speak(text_speak);
  } else {
    console.error("SpeechSynthesis API is not supported in this browser.");
  }
}

// Automatically call wishMe when the page loads
window.addEventListener("load", () => {
  wishMe();
});
