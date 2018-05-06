# hackHealth - Müd

_Nip bad moods in the bud_

## How to run the backend

### Prereqs

Install [mongodb (community edition)](https://www.mongodb.com/download-center#community)

[Instructions to install and run mongodb](https://docs.mongodb.com/manual/administration/install-community/)

Install [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)

mongod must be running for server and client to function.

Note that both server must be running for the client to operate.

### Start the backend api that communicates with `mongodb`

In `/node/server` do `npm install`

Then start the server with `node ./app.js`

### Start the react frontend

In `/node/client/src` do `npm install`

Then start with `npm start`

React will automatically open a browser for you

## How to run the Müd Fitbit watch face

Register with [Fitbit Studio](https://studio.fitbit.com/)

Create a new project named whatever

Drag the contents of `/fitbit/` to the left hand pane of Fitbit Studio.

Follow the instructions in [Fitbit's Getting Started page](https://dev.fitbit.com/getting-started/) to run the app in either the simulator or on a physical Fitbit Versa or Ionic.

In `/companion/index.js` change the value of the `ENDPOINT` variable to whatever url your server is running under. If the Fitbit watch face is running in the simulator then you can use a localhost address. If running on actual hardware localhost may not be accessible. One possible solution is to use [localtunnel](https://localtunnel.github.io/www/) to create a publically accessible https endpoing to your localhost instance.