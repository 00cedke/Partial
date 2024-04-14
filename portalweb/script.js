window.onload = function() {
    var storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
        messages = JSON.parse(storedMessages);
        updateMessageContainer();
    }
};

function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();

    if (message !== "") {
        messages.push(message);

        updateMessageContainer();

        messageInput.value = "";

        localStorage.setItem("messages", JSON.stringify(messages));
    }
}

function updateMessageContainer() {
    var messageContainer = document.getElementById("message-container");
    messageContainer.innerHTML = "";

    messages.forEach(function(message) {
        var newMessageElement = document.createElement("div");
        newMessageElement.textContent = message;
        messageContainer.appendChild(newMessageElement);
    });
}

var messages = [];

function showNotification() {
    var notificationContainer = document.getElementById("notification-container");
    var notification = document.getElementById("notification");
    
    notification.textContent = "test notif";

    notificationContainer.classList.remove("hidden");

    setTimeout(function() {
        notificationContainer.classList.add("hidden");
    }, 5000);
}

