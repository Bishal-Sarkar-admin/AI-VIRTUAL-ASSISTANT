let btn = document.querySelector("#button");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let date = new Date();
  let hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    speak("Good Morning Sir");
  } else if (hour >= 12 && hour < 18) {
    speak("Good Afternoon Sir");
  } else if (hour >= 18 && hour < 22) {
    speak("Good Evening Sir");
  } else {
    speak("Good Night Sir");
  }
}
window.addEventListener("load", () => {
  wishMe();
});

//specialautotakeCommand
function specialtakeCommand() {
  // Assuming `btn` and `voice` are already defined in the scope or globally
  btn.style.display = "flex";
  voice.style.display = "none";

  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();

  // Trigger the message if the time matches
  if (hour === 19 && min === 28) {
    speak("Let’s go sir, It is time to join the class");
    window.open(
      "https://www.kgcoding.in/s/courses/6642cc1b7070a1379b4c6d22/take#66ebbfbde2afd149c7d1cb07"
    );
  }

  if (hour === 20 && min === 58) {
    speak("Let’s go sir, It is time to join the class");
    window.open("https://meet.google.com/pvr-vqks-oee");
    window.open(
      "https://web.classplusapp.com/messages/details?convId=665ce0394bd1730012708142"
    );
  }
}

// Set up an interval to check the time 50000 milliseconds
setInterval(specialtakeCommand, 50000); // 60000 milliseconds = 1 minute

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
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello Sir, What can i help you");
  } else if (message.includes("how are you")) {
    speak("I am doing great, thanks for asking");
  } else if (message.includes("who are you")) {
    speak("I am virtual assistant, create by Bishal Sir");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com");
  } else if (message.includes("open whatsapp")) {
    speak("Opening Whatsapp");
    window.open("https://web.whatsapp.com/");
  } else if (message.includes("open Gmail")) {
    speak("Opening Gmail");
    window.open("https://mail.google.com/mail/u/0/#inbox");
  } else if (message.includes("open calculator")) {
    speak("Opening Calculator");
    window.open("calculator://");
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com/");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });

    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });

    speak(date);
  } else if (
    message.includes("open chatgpt") ||
    message.includes("open chat gpt")
  ) {
    speak("Opening ChatGpt");
    window.open("https://chatgpt.com/");
  } else {
    speak(
      `this is what i found on internet regarding ${message.replace(
        "aryan",
        ""
      )}`
    );
    window.open(
      `https://www.google.com/search?q=${message.replace("aryan", "")}`,
      "_blank"
    );
  }
}
