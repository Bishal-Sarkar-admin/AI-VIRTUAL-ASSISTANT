function specialtakeCommand() {
  let items = JSON.parse(localStorage.getItem("items"));

  // Loop through each item to check the time and trigger the event
  items.forEach((item) => {
    let { name, time, data, link } = item;

    // Split the time into hours and minutes
    let [hours, minutes] = time.split(":");

    // Convert to integers
    let hourInt = parseInt(hours, 10);
    let minuteInt = parseInt(minutes, 10);

    // Get the current time
    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();

    // Trigger the event if the time matches
    if (currentHour == hourInt && currentMinute == minuteInt) {
      speak(`Event ${name}`);
      speak(data);
      window.open(link);
    }
  });

  // Show/hide elements
  if (typeof btn !== "undefined" && typeof voice !== "undefined") {
    btn.style.display = "flex";
    voice.style.display = "none";
  } else {
    console.error("btn or voice is not defined.");
  }
}

// Set up an interval to check every minute (60000 milliseconds)
setInterval(specialtakeCommand, 45000);
