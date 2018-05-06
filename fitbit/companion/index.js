import * as messaging from "messaging";
import { settingsStorage } from "settings";

var ENDPOINT = "https://foolish-stingray-79.localtunnel.me";

messaging.peerSocket.onopen = () => {
  console.log("Ready");
}

messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}

messaging.peerSocket.onmessage = (evt) => {
  console.log('Companion msg received');
  console.log(JSON.stringify(evt.data));
  
  fetch(ENDPOINT,
  {
    body: JSON.stringify(evt.data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  .then(function (response) {
    console.log(response);
      response.json()
      .then(function(data) {
        //result
        console.log("Fetch Response: " + JSON.stringify(data));
      });
  })
  .catch(function (err) {
    console.log("Fetch Error: " + err);
  });
}

function sendMessage() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    
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
