const btn = document.querySelector("#button");
const content = document.querySelector("#content");
const voice = document.querySelector("#voice");

// Add event listener to the button

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
});
