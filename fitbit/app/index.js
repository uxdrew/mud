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

var moodPrompt = document.getElementById("mood-prompt-instance");

var checkmark = document.getElementById("checkmark-instance");

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
  //rotate flower each second
  gFlower.groupTransform.rotate.angle = secondsToAngle(secs);
  myClock.text = `${hours}:${mins}`;
}

function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

hrm.onreading = function() {
  // Peek the current sensor values
  //console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
}

// Begin monitoring the sensor
hrm.start();

messaging.peerSocket.onopen = () => {
  console.log("Ready");
}

messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}

var moodPromptEnabled = false;

messaging.peerSocket.onmessage = (evt) => {
  //console.log('App msg received - ' + evt.data.key);
  console.log(JSON.stringify(evt.data));
  if(evt.data.key == "moodPrompt")
  {
    console.log("moodPrompt app message received");
    moodPromptEnabled = true;
    // show mood prompt
    moodPrompt.animate("enable");
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
  if(moodPromptEnabled) {
    console.log('moodClick() called - ' + mood);
    var date = new Date(Date.now());
    var timestamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + ' ' + date.getHours();
    console.log("timestamp: " + timestamp);
    sendMessage({ hr: hrLabel.text, mud: mood, user: 'alec', timeStamp: timestamp });
    vibration.start("bump");
    //dismiss mood prompt
    moodPrompt.animate("disable");
    moodPromptEnabled = false;
    //start checkmark fade in/fade out
    checkmark.animate("enable");
  }
}

var happyButton = document.getElementById("happy-button");
var sadButton = document.getElementById("sad-button");

happyButton.onactivate = function(evt) {
  moodClick('happy');
}
sadButton.onactivate = function(evt) {
  moodClick('sad');
}
