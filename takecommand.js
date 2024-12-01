function takeCommand(command) {
  command = command.toLowerCase().trim();
  if (command.startsWith("opening")) {
    console.warn("!!!!!");
  } else if (command.startsWith("open")) {
    const platform = command.replace("open ", "").trim();
    const url = getUrl(platform);
    speak(`Opening ${platform}`);
    window.open(url); // Open in a new tab
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
    // System and Browser-specific URLs
    extension: "chrome://extensions/",
    setting: "chrome://settings/",
    download: "chrome://downloads/",
    bookmark: "chrome://bookmarks/",
    history: "chrome://history/",
    flags: "chrome://flags/",
    passwords: "chrome://settings/passwords",
    "clear cache": "chrome://settings/clearBrowserData",
    "site settings": "chrome://settings/content",
    "complete coding":
      "https://completecoding.graphy.com/s/courses/6642cc1b7070a1379b4c6d22/take",
    // Job-related Websites
    "linkedin jobs": "https://www.linkedin.com/jobs/",
    "monster india": "https://www.monsterindia.com/",
    "glassdoor jobs": "https://www.glassdoor.com/Job/",
    "government job": "https://www.ncs.gov.in/",
    "angel list": "https://angel.co/",

    job: "https://completecoding.graphy.com/t/u/community-chat?entityExternalId=6642cc1b7070a1379b4c6d22&channel=mern-job-support",
    // Productivity and Utilities
    "google keep": "https://keep.google.com/",
    "google drive": "https://drive.google.com/",
    "google docs": "https://docs.google.com/",
    "google sheets": "https://sheets.google.com/",
    photos: "https://photos.google.com/",
    "google calendar": "https://calendar.google.com/",

    leetcode: "https://leetcode.com/",
    "geeks for geeks": "https://www.geeksforgeeks.org/",
    coursera: "https://www.coursera.org/",
    notion: "https://www.notion.so/",
    "mozilla developer": "https://developer.mozilla.org/",
    "google scholar": "https://scholar.google.com/",

    // Communication and Social Media
    whatsapp: "https://web.whatsapp.com/",
    telegram: "https://web.telegram.org/",

    // News and Information
    "google news": "https://news.google.com/",
    cnn: "https://edition.cnn.com/",
    timesofindia: "https://timesofindia.indiatimes.com/",

    // Entertainment and Streaming

    "amazon prime video": "https://www.primevideo.com/",

    // Finance and Banking
    "google pay": "https://pay.google.com/",
    groww: "https://groww.in/",

    // Miscellaneous

    "google maps": "https://maps.google.com/",

    "amazon kindle": "https://read.amazon.com/",
  };
  return urlMap[platform] || `https://www.${platform}.com/`;
}
