const btn = document.querySelector("#button");
const content = document.querySelector("#content");
const voice = document.querySelector("#voice");

// Initialize Speech Recognition
const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript; // Display recognized text
  takeCommand(transcript.toLowerCase()); // Pass the command to the handler
};

// Add Event Listener: Start voice recognition on button click
btn.addEventListener("click", () => {
  recognition.start();
});

// Restart recognition if it ends
recognition.onend = () => {
  recognition.start();
};
