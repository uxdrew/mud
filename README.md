# hackHealth - Müd

**_Nip bad moods in the bud_**

## [HackHLTH 2018 Entry](http://www.hackathon.io/mud6)

## About

The stigma of mental illness is the biggest barrier to mental health care. 

We felt passionate about proving a solution to help reduce “social distancing” by making as positive of an experience for people to gain better insight into their well-being and mental health, as fitbit has accomplished for physical fitness. 

Müd (pronounced mood) is a simple “one-tap app” that captures patient mood, ultimately allowing the patient and healthcare provider insights to spot potential problems early on, by allowing patient mood to be overlaid with additional captured biophysical markers that can then be easily charted to help patients and healthcare providers alike perform a “psychological tuneup”. 

Let’s nip bad moods in the bud.

## Team

* Andrew Harris
* Alec Paulson
* Jeff Wise

##
![Clock Face](https://github.com/jeffwise26/hackHealth/blob/master/assets/gitbub_demo.gif)
*init*

# How To Run

## Backend

### Prereqs

* Install [mongodb (community edition)](https://www.mongodb.com/download-center#community)

  * [Instructions to install and run mongodb](https://docs.mongodb.com/manual/administration/install-community/)
  
  * mongod must be running for server and client to function.

* Install [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)

* Note that the server must be running for the client to operate.

### Start the backend api that communicates with `mongodb`

* In `/node/server` do `npm install`

* Then start the server with `node ./app.js`

### Start the react frontend

* In `/node/client/src` do `npm install`

* Then start with `npm start`

  * React will automatically open a browser for you.

## Müd Fitbit watch face

* Register with [Fitbit Studio](https://studio.fitbit.com/)

* Create a new project named whatever.

* Drag the contents of `/fitbit/` to the left hand pane of Fitbit Studio.

* Follow the instructions in [Fitbit's Getting Started page](https://dev.fitbit.com/getting-started/) to run the app in either the simulator or on a physical Fitbit Versa or Ionic.

* In `/companion/index.js` change the value of the `ENDPOINT` variable to whatever url your server is running under (`http://localhost:8080` by default). If the Fitbit watch face is running in the simulator then you can use a localhost address. If running on actual hardware localhost may not be accessible. One possible solution is to use [Localtunnel](https://localtunnel.github.io/www/) to create a publically accessible https endpoint to your localhost instance.

* In the Fitbit Companion App tap `Prompt for Mood Now!` to trigger the watch face to prompt for your mood. Tap the happy face if you're currently happy or the sad face if you're feeling blue.

* Your mood will be sent to the backend express server and stored in `mongodb` in the `mudDatabase.mudData` collection.

* View a graph of your moods by browsing to the client at `http://localhost:3000`