function specialtakeCommand() {
  // Retrieve and parse items from localStorage
  let items = JSON.parse(localStorage.getItem("items")) || [];

  // Check if items array is not empty
  if (items.length === 0) {
    // console.log("stack empty");
    return;
  }

  // Create a new array for items that are yet to be triggered
  let remainingItems = [];

  // Loop through each item to check the time and trigger the event
  items.forEach((item) => {
    let { name, time, data, link } = item;

    if (time) {
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
      if (currentHour === hourInt && currentMinute === minuteInt) {
        speak(`Event: ${name}`);
        speak(data);
        window.open(link);
        // Do not add this item to remainingItems, hence effectively "deleting" it from localStorage
      } else {
        // If time doesn't match, keep the item in remainingItems
        remainingItems.push(item);
      }
    } else {
      speak(`Invalid time format for item: ${name}`);
      remainingItems.push(item); // Keep item to prevent accidental deletion due to format issues
    }
  });

  // Update the localStorage with remaining items (i.e., the items yet to be triggered)
  localStorage.setItem("items", JSON.stringify(remainingItems));

  // Show/hide elements
  if (typeof btn !== "undefined" && typeof voice !== "undefined") {
    btn.style.display = "flex";
    voice.style.display = "none";
  } else {
    speak("btn or voice is not defined.");
  }
}

// Set up an interval to check every 5000 milliseconds
setInterval(specialtakeCommand, 5000);
