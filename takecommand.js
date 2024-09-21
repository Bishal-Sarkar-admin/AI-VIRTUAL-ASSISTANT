function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  message = message.trim().toLowerCase(); // Normalize the message

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello Sir, What can I help you with?");
  } else if (message.includes("how are you")) {
    speak("I am doing great, thanks for asking.");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by Bishal Sir.");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    if (isMobile()) {
      window.open("YouTube://", "_blank");
    } else {
      window.open("https://www.youtube.com", "_blank");
    }
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp");
    if (isMobile()) {
      window.open("Whatsapp://", "_blank");
    } else {
      window.open("https://web.whatsapp.com/", "_blank");
    }
  } else if (message.includes("open gmail")) {
    speak("Opening Gmail");
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  } else if (message.includes("open telegram")) {
    speak("Opening Telegram");
    window.open("https://web.telegram.org/a/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com/", "_blank");
  } else if (message.includes("open messenger")) {
    speak("Opening Messenger");
    window.open("https://www.messenger.com/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening Calculator");
    window.open("https://www.google.com/search?q=calculator", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("open geeksforgeeks")) {
    speak("Opening Geeksforgeeks");
    window.open("https://www.geeksforgeeks.org/", "_blank");
  } else if (message.includes("open leetcode")) {
    speak("Opening Leetcode");
    window.open("https://leetcode.com/", "_blank");
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
    speak("Opening ChatGPT");
    window.open("https://chatgpt.com/", "_blank");
  } else {
    speak(`Here are the search results for ${message.replace("aryan", "")}`);
    window.open(
      `https://www.google.com/search?q=${message.replace("aryan", "")}`,
      "_blank"
    );
  }
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
