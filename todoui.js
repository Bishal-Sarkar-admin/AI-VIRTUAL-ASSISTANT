// Counter to assign unique IDs for each new list item and delete button
let count = 1;
function loadItems() {
  // Get items from localStorage or initialize an empty array if nothing is stored
  let itemsArray = JSON.parse(localStorage.getItem("items")) || [];

  // Get the current date and time
  let currentTime = new Date();

  // Filter out past items (items with a time less than the current time)
  let futureItemsArray = itemsArray.filter((item) => {
    let itemTime = new Date(currentTime.toDateString() + " " + item.time);
    return itemTime >= currentTime; // Keep only future items
  });

  // Sort the remaining (future) items by how close their time is to the current time
  futureItemsArray.sort((a, b) => {
    let timeA = new Date(currentTime.toDateString() + " " + a.time);
    let timeB = new Date(currentTime.toDateString() + " " + b.time);

    return timeA - currentTime - (timeB - currentTime);
  });

  // Save the updated array back to localStorage
  localStorage.setItem("items", JSON.stringify(futureItemsArray));

  console.log("Future Items:", futureItemsArray);

  // Do something with sorted future items, e.g., display them or set them up for reminders

  // Clear the current list
  document.getElementById("todo").innerHTML = "";

  // Display each item
  itemsArray.forEach((item, index) => {
    let newListItem = document.createElement("li");
    newListItem.id = "to" + (index + 1); // Assign a unique ID
    newListItem.innerHTML = `Name: ${item.name}, Time: ${item.time}, Data: ${item.data}, Link: <a href="${item.link}" target="_blank">${item.link}</a> `;

    // Create a delete button for each item
    let deleteButton = document.createElement("button");
    deleteButton.id = "deleteBtn" + (index + 1); // Unique ID for delete button
    deleteButton.className = "boo"; // Use className instead of class
    deleteButton.textContent = "Delete";

    // Append the delete button to the list item
    newListItem.appendChild(deleteButton);

    // Add delete functionality
    deleteButton.addEventListener("click", function () {
      deleteItem(index);
    });

    // Append the new list item to the 'todo' list
    document.getElementById("todo").appendChild(newListItem);
  });
}

// Function to delete an item from localStorage and refresh the list
function deleteItem(index) {
  let itemsArray = JSON.parse(localStorage.getItem("items")) || [];
  itemsArray.splice(index, 1); // Remove the item at the given index
  localStorage.setItem("items", JSON.stringify(itemsArray)); // Save the updated array
  loadItems(); // Reload the list
}

// Add event listener to the Add button
document.getElementById("add").addEventListener("click", function () {
  // Get input values
  let eventName = document.getElementById("fname").value;
  let eventTime = document.getElementById("ftime").value;
  let eventData = document.getElementById("fdata").value;
  let eventLink = document.getElementById("flink").value;

  // Create a new item
  let items = {
    name: eventName,
    time: eventTime,
    data: eventData,
    link: eventLink,
  };

  // Retrieve existing items from localStorage
  let itemsArray = JSON.parse(localStorage.getItem("items")) || [];

  // Add the new item to the array
  itemsArray.push(items);

  // Store the updated array in localStorage
  localStorage.setItem("items", JSON.stringify(itemsArray));

  // Reload the list to display the newly added item
  loadItems();

  // Clear input fields after adding the event
  document.getElementById("fname").value = "";
  document.getElementById("ftime").value = "";
  document.getElementById("fdata").value = "";
  document.getElementById("flink").value = "";
});

// Sort and refresh the list every 1 minute (60,000 milliseconds)
setInterval(() => {
  loadItems();
}, 60000); // 1 minute interval (60000 ms)

// Load items when the page loads
window.onload = loadItems;
