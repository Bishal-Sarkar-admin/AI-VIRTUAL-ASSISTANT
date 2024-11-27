function sendCommand(command, website) {
  const message = { command, website };
  window.postMessage(message, "https://bishal-sarkar-admin.github.io");
  console.log(command, website);
}

function sendCommandsong(command, platform, song) {
  const message = { command, platform, song };
  window.postMessage(message, "https://bishal-sarkar-admin.github.io");
  console.log(command, platform, song);
}
// Function to clean and normalize input
function normalizeInput(data) {
  return data.trim().replace(/\s*\.\s*$/, ""); // Remove trailing dots and trim extra spaces
}
// Function to filter "play" commands and extract the song and platform
function filterPlay(data) {
  const normalizedData = normalizeInput(data); // Normalize the input first
  const match = normalizedData.match(/^play\s+(.+)\s+on\s+(\w+)$/i); // Match "play <song> on <platform>"

  if (match) {
    const song = match[1].trim();
    const platform = match[2].trim().toLowerCase();

    // Send the open command with song and platform
    sendCommandsong("play", platform, song);

    return song + " on " + platform; // Return the song and platform as an object
  }

  return null; // Return null if no match
}
// Function to filter "open" commands and extract the service name
function filteropen(data) {
  const normalizedData = normalizeInput(data); // Normalize the input first
  const match = normalizedData.match(/^open\s+(.*)$/i); // Match "open" followed by the service name
  if (match) {
    sendCommand("open", { platform: match[1].trim() }); // Use platform instead of website
    return match[1].trim(); // Return the service name, trimmed of extra spaces
  }
  return null; // Return null if no match
}

// Function to filter "close" commands and extract the service name
// Function to filter "close" commands and extract the service name
function filterclose(data) {
  const normalizedData = normalizeInput(data); // Normalize the input first
  const match = normalizedData.match(/^close\s+(.*)$/i); // Match "close" followed by the service name
  if (match) {
    const serviceName = match[1].trim(); // Extract and trim the service name
    sendCommand("close", { platform: serviceName }); // Use "platform" as the key for consistency
    return serviceName; // Return the service name
  }
  return null; // Return null if no match
}

// Function to filter "tab clear" commands and extract the service name
function filterTabClose(data) {
  const normalizedData = normalizeInput(data); // Normalize the input first
  const match = normalizedData.match(/^(.*)\s*clear$/i); // Match the service name followed by "clear" at the end

  if (match) {
    sendCommand("clear", match[1].trim()); // Send the command to close the service
    return match[1].trim(); // Return the service name, trimmed of extra spaces
  }

  return null; // Return null if no match
}

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  // Normalize message
  message = message.trim().toLowerCase();
  const normalInput = normalizeInput(message);
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
      patterns: [/date/, /what is the date/, /tell me today's date/],
      response: getDate(),
    },
    {
      patterns: [/^play/],
      response: `Playing ${filterPlay(normalInput)}.`,
    },
    {
      patterns: [/^open/],
      response: `Opening ${filteropen(normalInput)}.`,
    },
    {
      patterns: [/^close/],
      response: `Closing ${filterclose(normalInput)}.`,
    },
    {
      patterns: [/clear$/, /clear.$/],
      response: `Closing ${filterTabClose(normalInput)}.`,
    },
    {
      patterns: [/joke/, /make me laugh/, /tell me something funny/],
      response: tellJoke(),
    },
    {
      patterns: [/open youtube/],
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
      patterns: [/search (.+)/],
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
