'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var req = require("request");
 
var connectionString = process.argv[2];
var iothuburl = process.argv[3];
var auth = process.argv[4];

console.log ("connectionString:" + connectionString);
console.log ("iothuburl:" + iothuburl);
console.log ("auth:" + auth);

var headers = {
             'Content-Type':'application/json',
             'Authorization': auth
}

var options = {
  url:iothuburl,
  method: 'GET',
  headers: headers

};

var deviceList;
req(options, function(error, response, body) {
  console.log(body);
deviceList = JSON.parse(body); 
});


var SendNotification = function(devId)
{
    console.log(devId);
}

var serviceClient = Client.fromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
   
  };
}

serviceClient.open(function (err) {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Service client connected');
 
    var message = new Message('Cloud to device message. From VSO.');
    message.ack = 'full';
    message.messageId = "My Message ID2223";
    console.log('Sending message: ' + message.getData());
    deviceList.forEach(function(element) {
      var id = element.deviceId;
      serviceClient.send(id, message, printResultFor('send'));
      console.log("Sent message to ... " + id);
        
    }, this);    

    console.log("done");    
     process.exit();
  }
})
