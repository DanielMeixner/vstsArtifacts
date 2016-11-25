'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var req = require("request");
 
var connectionString = process.argv[2];
var iothuburl = process.argv[3];
var auth = process.argv[4];

var headers = {
             'Content-Type':'application/json',
             'Authorization':auth
}

var options = {
  url:iothuburl,
  method: 'GET',
  headers: headers

};

var deviceList;
req(options, function(error, response, body) {
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
    process.exit();
  };
}

function receiveFeedback(err, receiver){
  process.exit();
  // receiver.on('message', function (msg) {
  //   console.log('Feedback message:')
  //   // console.log(msg.getData().toString('utf-8'));
  //   //process.exit();
  // });
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
        serviceClient.send(element, message, printResultFor('send'));
        
    }, this);
    

    console.log("done");

    
  }
})
