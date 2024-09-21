//wishme function

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

//speak function
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB";
  window.speechSynthesis.speak(text_speak);
}

//
