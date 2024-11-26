function sendCommand(command, website) {
  const message = { command, website };
  window.postMessage(message, "https://bishal-sarkar-admin.github.io");
}

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  // Normalize message
  message = message.trim().toLowerCase();

  // Utility Functions
  const getTime = () => {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return `The current time is ${time}`;
  };

  const getDate = () => {
    const date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `Today's date is ${date}`;
  };

  const tellJoke = () => {
    const jokes = [
      "Why don’t skeletons fight each other? They don’t have the guts!",
      "What do you call cheese that isn't yours? Nacho cheese!",
      "Why couldn’t the bicycle stand up by itself? It was two-tired.",
      "What did the ocean say to the beach? Nothing, it just waved.",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  };

  // Intent Map (JSON-based structure)
  const intents = [
    {
      patterns: [/who are you(\?|$)/, /what are you/],
      response:
        "I am your intelligent assistant, Created by Mr. Bishal Sarkar. I can help you with various tasks.",
    },
    {
      patterns: [/how are you(\?|$)/],
      response: "I'm functioning perfectly. How can I assist you today?",
    },
    {
      patterns: [/time/, /what is the time/, /tell me the time/],
      response: getTime(),
    },
    {
      patterns: [/open whatsapp/],
      response: "opening whatsapp web",
      action: () => window.open("https://web.whatsapp.com/"),
    },
    {
      patterns: [/close whatsapp/],
      action: () => sendCommand("close", "whatsapp"),
    },
    {
      patterns: [/open youtube/],
      response: "opening youtube",
      action: () => window.open("https://www.youtube.com/"),
    },
    {
      patterns: [/close youtube/],
      action: () => sendCommand("close", "youtube"),
    },
    {
      patterns: [/open github/],
      response: "opening github",
      action: () => window.open("https://github.com/Bishal-Sarkar-admin"),
    },
    {
      patterns: [/close github/],
      action: () => sendCommand("close", "github"),
    },
    {
      patterns: [/open instagram/],
      response: "opening instagram",
      action: () => window.open("https://www.instagram.com/instragram.me2023/"),
    },
    {
      patterns: [/close instagram/],
      action: () => sendCommand("close", "instagram"),
    },
    {
      patterns: [/open facebook/],
      response: "opening facebook",
      action: () => window.open("https://www.facebook.com/"),
    },
    {
      patterns: [/close facebook/],
      action: () => sendCommand("close", "facebook"),
    },
    {
      patterns: [/open chatgpt/],
      response: "opening chatgpt",
      action: () => window.open("https://chatgpt.com/"),
    },
    {
      patterns: [/close chatgpt/],
      action: () => sendCommand("close", "chatgpt"),
    },
    {
      patterns: [/open google/],
      response: "opening google",
      action: () => window.open("https://www.google.com/"),
    },
    {
      patterns: [/close google/],
      action: () => sendCommand("close", "google"),
    },
    {
      patterns: [/open google drive/],
      response: "opening google drive",
      action: () => window.open("https://drive.google.com/"),
    },
    {
      patterns: [/close google drive/],
      action: () => sendCommand("close", "google drive"),
    },
    {
      patterns: [/open photos/],
      response: "opening photos",
      action: () => window.open("https://photos.google.com/"),
    },
    {
      patterns: [/close photos/],
      action: () => sendCommand("close", "photos"),
    },
    {
      patterns: [/open google keep/],
      response: "opening google keep",
      action: () => window.open("https://keep.google.com/"),
    },
    {
      patterns: [/close google keep/],
      action: () => sendCommand("close", "google keep"),
    },
    {
      patterns: [/open blackbox/],
      response: "opening blackbox",
      action: () => window.open("https://www.blackbox.ai/"),
    },
    {
      patterns: [/close blackbox/],
      action: () => sendCommand("close", "blackbox"),
    },
    {
      patterns: [/open gmail/],
      response: "opening gmail",
      action: () => window.open("https://mail.google.com/"),
    },
    {
      patterns: [/close gmail/],
      action: () => sendCommand("close", "gmail"),
    },
    {
      patterns: [/open telegram/],
      response: "opening telegram",
      action: () => window.open("https://web.telegram.org/"),
    },
    {
      patterns: [/close telegram/],
      action: () => sendCommand("close", "telegram"),
    },
    {
      patterns: [/date/, /what is the date/, /tell me today's date/],
      response: getDate(),
    },
    {
      patterns: [/joke/, /make me laugh/, /tell me something funny/],
      response: tellJoke(),
    },
    {
      patterns: [/open youtube/, /play youtube/],
      response: "Opening YouTube.",
      action: () => window.open("https://www.youtube.com", "_blank"),
    },
    {
      patterns: [/ai (.+)/, /arion (.+)/],
      response: (match) => `Searching for ${match[1]} on Google.`,
      action: async (match) => {
        const queryResult = await query({
          inputs: match[1],
        });

        console.log(queryResult); // Log the entire response for debugging

        // Extract the generated text (check the response structure)
        const generatedText = queryResult[0]?.generated_text;

        if (generatedText) {
          const cleanedText = generatedText.replace(/[\n\s]+/g, " ").trim();
          speak(cleanedText); // Output the cleaned text
        } else {
          console.error("No generated text found in the response.");
        }
      },
    },
    {
      patterns: [/search (.+)/, /google (.+)/],
      response: (match) => `Searching for ${match[1]} on Google.`,
      action: (match) =>
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(match[1])}`,
          "_blank"
        ),
    },
    {
      patterns: [/shutdown/, /exit/, /close/],
      response: "Goodbye! Have a great day.",
      action: () => {
        speak("Goodbye! Have a great day.");
        if (window.opener) {
          window.close();
        } else {
          alert(
            "I cannot close the window directly. Please close it manually."
          );
        }
      },
    },
  ];

  // Match Intent
  let matchedIntent = null;
  let matchData = null;

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      const match = message.match(pattern);
      if (match) {
        matchedIntent = intent;
        matchData = match;
        break;
      }
    }
    if (matchedIntent) break;
  }

  // Respond to Matched Intent
  if (matchedIntent) {
    const response =
      typeof matchedIntent.response === "function"
        ? matchedIntent.response(matchData)
        : matchedIntent.response;

    speak(response);

    // Perform action if available
    if (matchedIntent.action) {
      matchedIntent.action(matchData);
    }
  } else {
    // Fallback: Intelligent suggestion
    const data = message;
    speak(`Searching for ${data} on Google.`);

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(data)}`,
      "_blank"
    );
  }
}
