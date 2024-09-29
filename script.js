let btn = document.querySelector("#button");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Add event listener to the button

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
});
