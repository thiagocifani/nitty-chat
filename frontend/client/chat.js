import createChannel from "client/cable";

let callback;

const chat = createChannel("ChatChannel", {
  received({ message }) {
    console.log("shit");
    if (callback) callback.call(null, message);
  }
});

// Sending a message: 'perform' method calls a respective Ruby method
// define in chat_channel.rb. That's your bridge between JS and Ruby!

function sendMessage(message) {
  chat.perform("send_message", { message });
}

// Getting a message: this callback will be invoked once we receive
// something over ChatChannel

function setCallback(fn) {
  callback = fn;
}

export { sendMessage, setCallback };
