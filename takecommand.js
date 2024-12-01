function takeCommand(command) {
  command = command.toLowerCase().trim();
  if (command.startsWith("opening")) {
    console.warn("!!!!!");
  } else if (command.startsWith("open")) {
    const platform = command.replace("open ", "").trim();
    const url = getUrl(platform);
    speak(`Opening ${platform}`);
    window.open(url, "_blank"); // Open in a new tab
  } else if (command.startsWith("close")) {
    console.warn(
      "Close command is not supported directly due to browser security."
    );
    console.log(command);
  } else if (command.startsWith("clear")) {
    console.warn("Clearing all tabs is not allowed by default browsers.");
    console.log(command);
  } else if (command.startsWith("play youtube")) {
    const song = command.replace("play youtube ", "").trim();
    speak(`Playing ${song} on YouTube`);
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        song
      )}`,
      "_blank"
    );
  } else if (command.startsWith("play spotify")) {
    const song = command.replace("play spotify ", "").trim();
    speak(`Playing ${song} on Spotify`);
    window.open(
      `https://open.spotify.com/search/${encodeURIComponent(song)}`,
      "_blank"
    );
  } else if (command.startsWith("play jiosaavn")) {
    const song = command.replace("play jiosaavn ", "").trim();
    speak(`Playing ${song} on jiosaavn`);
    window.open(
      `https://www.jiosaavn.com/search/song/${encodeURIComponent(song)}`,
      "_blank"
    );
  } else {
    console.log(command);
  }
}

// Helper Function: Get URL for known platforms
function getUrl(platform) {
  const urlMap = {
    gmail: "https://mail.google.com/",
    drive: "https://drive.google.com/",
    whatsapp: "https://web.whatsapp.com/",
    youtube: "https://www.youtube.com/",
    spotify: "https://open.spotify.com/",
    "chat gpt": "https://chatgpt.com/",
  };
  return urlMap[platform] || `https://www.${platform}.com/`;
}
