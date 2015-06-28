require('leapjs/template/entry');
require('leapjs-plugins/main/transform/leap.transform');
var request = require('request');
var controller = new Leap.Controller()
    .use('transform', {
        vr: true
        })
    ;
var position = [];
var rightGpioUrl = "http://192.168.0.20:8000/GPIO/24/";
var distance = -120;
var scale = 500;
var upEvent = true;

controller.on("frame", function (frame) {
    var handsLength = frame.hands.length;
    console.log(handsLength);
    if (handsLength == 2) {
        upEvent = true;
        console.log("UP");
    }
    if ((upEvent) && handsLength == 0){
        console.log("Down");
        upEvent = false;
        request
            .post(rightGpioUrl + "function/out")
            .on('error', function(err) {
                console.log(err)
            });
        request
            .post(rightGpioUrl + "value/1")
            .on('error', function(err) {
                console.log(err)
            });
        setTimeout(function () {
            request
                .post(rightGpioUrl + "value/0")
                .on('error', function(err) {
                    console.log(err)
                });
        }, scale);
    }
});

controller.on('ready', function () {
    console.log("ready");
});
controller.on('connect', function () {
    console.log("connect");
});
controller.on('disconnect', function () {
    console.log("disconnect");
});
controller.on('focus', function () {
    console.log("focus");
});
controller.on('blur', function () {
    console.log("blur");
});
controller.on('deviceConnected', function () {
    console.log("deviceConnected");
});
controller.on('deviceDisconnected', function () {
    console.log("deviceDisconnected");
});

controller.connect();
console.log("\nWaiting for device to connect...");
