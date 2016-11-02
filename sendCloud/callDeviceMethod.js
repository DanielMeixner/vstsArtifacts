'use strict';

var Client = require('azure-iothub').Client;
var connectionString = process.argv[2];
var methodName = 'writeLine';
var deviceId = process.argv[3];

var client = Client.fromConnectionString(connectionString);
var methodParams = {
    methodName: methodName,
    payload: 'a line to be written',
    timeoutInSeconds: 30
};

client.invokeDeviceMethod(deviceId, methodParams, function (err, result) {
    if (err) {
        console.error('Failed to invoke method \'' + methodName + '\': ' + err.message);
    } else {
        console.log(methodName + ' on ' + deviceId + ':');
        console.log(JSON.stringify(result, null, 2));
    }
});