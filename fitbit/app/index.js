import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";
import { HeartRateSensor } from "heart-rate";
import { vibration } from "haptics";

var hrm = new HeartRateSensor();
var hrLabel = document.getElementById("hr");
// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myClock = document.getElementById("myClock");
var gFlower = document.getElementById("g-flower");

var moodPrompt = document.getElementById("mood-prompt");

vibration.start("ping");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  gFlower.groupTransform.rotate.angle = secondsToAngle(secs);
  myClock.text = `${hours}:${mins}`;
  //sendMessage({'msg':'Tick'});
}

function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
  //lastValueTimestamp = Date.now();
}

// Begin monitoring the sensor
hrm.start();

messaging.peerSocket.onopen = () => {
  console.log("Ready");
  sendMessage();
}

messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}

messaging.peerSocket.onmessage = (evt) => {
  console.log('App msg received - ' + evt.data.key);
  console.log(JSON.stringify(evt.data));
  if(evt.data.key == "moodPrompt")
  {
    console.log("moodPrompt app message received");
    moodPrompt.style.display = "inline";
    vibration.start("ping");
  }
}

function sendMessage(obj) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(obj);
  }
}

function moodClick(mood) {
  console.log('moodClick() called - ' + mood);
  var date = new Date(Date.now())
  console.log(date);
  var timestamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + ' ' + date.getHours();
  console.log("timestamp: " + timestamp);
  sendMessage({ hr: hrLabel.text, mud: mood, user: 'alec', timestamp: timestamp });
  moodPrompt.style.display = "none";
}

var happyButton = document.getElementById("happy-button");
var sadButton = document.getElementById("sad-button");

happyButton.onactivate = function(evt) {
  moodClick('happy');
}
sadButton.onactivate = function(evt) {
  moodClick('sad');
}
