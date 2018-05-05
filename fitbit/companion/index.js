import * as messaging from "messaging";
import { settingsStorage } from "settings";

messaging.peerSocket.onopen = () => {
  console.log("Ready");
  //sendMessage();
}

messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}

messaging.peerSocket.onmessage = (evt) => {
  console.log('Companion msg received');
  console.log(JSON.stringify(evt.data));
}

function sendMessage() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send({
      sampleData: 123456
    });
  }
}

// Settings have been changed
settingsStorage.onchange = function(evt) {
  console.log("settings storage onchange called");
  settingsStorage.setItem('moodPrompt', 'false');
  sendValue(evt.key, evt.newValue);
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
