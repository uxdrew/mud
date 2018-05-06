import * as messaging from "messaging";
import { settingsStorage } from "settings";

var ENDPOINT = "https://wonderful-snake-18.localtunnel.me";

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
  
  var querystr = "/?user=" + evt.data['user'] + "&mud=" + evt.data["mud"] + "&timeStamp=" + evt.data["timestamp"] + "&hr=" + evt.data["hr"];
  console.log("querystr=" + querystr);
  
  fetch(ENDPOINT + querystr,
  {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
