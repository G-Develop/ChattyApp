// server.js
//================ SERVER STUFF ==============================
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const PORT = 3001;  // Set the port to 3001
const app = express()  // Create a new express server
.use(express.static('public'))  // Make the express server serve static assets (html, javascript, css)  from the /public folder
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${PORT}`)
);
const wsServer = new SocketServer({server: app});  // Create the WebSockets server and attach it to express
const id = uuid()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Stores the current value of the text box on the client
let currentContents = '';


//========================wsSERVER.ON ==============================
// Set up a callback that will run when a client connects to the server When a client connects they are assigned a socket, represented by the `client` argument in the callback.
wsServer.on('connection', (client) => {
  console.log('Client connected');

  // Send current textbox contents on connection
  client.send(currentContents);
  

  // Handle messages
  client.on('message', message => ( (handleMessage(message, id))));
  

  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser tab.
  client.on('close', () => console.log('Client disconnected'));
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// Broadcast - Goes through each client and sends message data
wsServer.broadcast = function(data) {
  wsServer.clients.forEach(function(client) {
    client.send(data);
  });
};


//=============== FUNCTIONS ===========================


// Handles incoming messages &  Stores the current state of the textbox and broadcasts it
function handleMessage(message, id) {
  //console.log("the unparesed message : ", message);
  let parsedJson = JSON.parse(message);
   parsedJson.id = id
  //console.log("the paresed Message ", parsedJson);
  //console.log(`User ${parsedJson.userName} said ${parsedJson.content}`)
  console.log( parsedJson)
}


// Simply broadcasts the message back to all clients
function broadcastBack(message) {
  console.log(`Received: ${message}`)
  wsServer.broadcast(message);
}
