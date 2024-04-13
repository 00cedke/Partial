function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value;

    if (message.trim() !== "") {
        addMessageToPage(message);

        messageInput.value = "";
    }
}

function addMessageToPage(message) {
    var messageContainer = document.getElementById("message-container");
    var newMessageElement = document.createElement("div");
    newMessageElement.textContent = message;
    messageContainer.appendChild(newMessageElement);
}
