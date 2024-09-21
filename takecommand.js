function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  // Normalize message
  message = message.trim().toLowerCase();

  // General responses
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello Sir, What can I help you with?");
  } else if (message.includes("how are you")) {
    speak("I am doing great, thanks for asking.");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by Bishal Sir.");
  }
  // Open web services, no app URIs for Chrome
  else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp Web");
    window.open("https://web.whatsapp.com/", "_blank");
  } else if (message.includes("open gmail")) {
    speak("Opening Gmail");
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  } else if (message.includes("open telegram")) {
    speak("Opening Telegram Web");
    window.open("https://web.telegram.org/a/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com/", "_blank");
  } else if (message.includes("open messenger")) {
    speak("Opening Messenger");
    window.open("https://www.messenger.com/", "_blank");
  }
  // Other commands
  else if (message.includes("open calculator")) {
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
  }
  // Time and date
  else if (message.includes("time")) {
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
  }
  // Open ChatGPT
  else if (
    message.includes("open chatgpt") ||
    message.includes("open chat gpt")
  ) {
    speak("Opening ChatGPT");
    window.open("https://chat.openai.com/", "_blank"); // Updated URL
  }
  // Default: Google search
  else {
    speak(`Here are the search results for ${message}`);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(message)}`,
      "_blank"
    );
  }
}
