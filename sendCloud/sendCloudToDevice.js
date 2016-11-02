

'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = 'HostName=DmxIoTHub.azure-devices.net;SharedAccessKeyName=tmppol;SharedAccessKey=k9KXs19ShC5ByxvDl16HhtbiUj4bSap1ZhF1rfQJCTU=';
var targetDevice = 'Device31-7ce4a850';

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
 //   serviceClient.getFeedbackReceiver(receiveFeedback);
    var message = new Message('Cloud to device message. From VSO.');
    message.ack = 'full';
    message.messageId = "My Message ID2223";
    console.log('Sending message: ' + message.getData());
    serviceClient.send(targetDevice, message, printResultFor('send'));
    console.log("done");

    
  }
})
