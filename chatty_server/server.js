// server.js
//================ SERVER STUFF ==============================
const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws'); //much easier to follow documentation 
const uuid = require('uuid');
const PORT = 3001;  // Set the port to 3001
const server  = express()  // Create a new express server
.use(express.static('public'))  // Make the express server serve static assets (html, javascript, css)  from the /public folder
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${PORT}`)
);
const wss  = new SocketServer({server});  // Creates the WebSockets server and attaches it to express
const id = uuid()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




//========================SERVER.ON ==============================
// Set up a callback that will run when a client connects to the server When a client connects they are assigned a socket, represented by the `ws` argument in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  handleConnectedUsers();

  // Handle messages
  //ws.on('message', message => ( (handleMessage(message))));

  //Handle incoming message from App
  ws.on('message', (message) => {
    handleMessage(message)
  });

  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser tab.
  ws.on('close', () => {
    console.log('Client disconnected');
    handleConnectedUsers();
  });
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




//=============== FUNCTIONS ===========================


// Handles incoming messages gives them an id   
function handleMessage(message ) {
  let parsedJson = JSON.parse(message);
  parsedJson.id = id
  parsedJson.type = 'incomingMessage' //not sure if this should be a string **** 
  console.log(`User ${parsedJson.userName} said ${parsedJson.content}`)
  console.log("here ", parsedJson)
  wss.broadcast(JSON.stringify(parsedJson))
}


// Handles connected users
function handleConnectedUsers() {
  const messageObjNotification = {
    id: id, 
    type: 'connectedUsers',
    userCount: wss.clients.size, 
  }
  wss.broadcast(JSON.stringify(messageObjNotification))
  console.log("userCount: ============>",  messageObjNotification.userCount)
}

// Handles incoming notifications  gives them an id   
function handleNameChange(message) {
  let parsedJson = JSON.parse(message);
  parsedJson.id = id
  parsedJson.type = 'incomingNotification' //not sure if this should be a string **** 
  //console.log(`User ${parsedJson.userName} said ${parsedJson.content}`)
  console.log(parsedJson)
  wss.broadcast(JSON.stringify(parsedJson))
}




// Broadcast - Goes through each client and sends message data
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
      console.log("this is the data ========>", data);
    }
  });
};



