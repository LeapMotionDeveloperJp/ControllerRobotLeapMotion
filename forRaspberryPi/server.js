require('leapjs/template/entry');
require('leapjs-plugins/main/hand-entry/leap.hand-entry');

var request = require('request');
var frameCount = 0;
var position;
var controller = new Leap.Controller()
//    .use('handEntry')
    ;
var rightFlag = false;
var leftFlag = false;
var rightGpio = "http://192.168.0.20:8000/GPIO/18/";
var leftGpio = "http://192.168.0.20:8000/GPIO/24/";

controller.on("frame", function (frame) {
//    console.log("Frame: " + frame.id + " @ " + frame.timestamp);
    console.log("frame.hands: " + frame.hands);

    if(frame.hands.length > 0)
    {
        var hand = frame.hands;
        position = hand.palmPosition;
        var velocity = hand.palmVelocity;
        var direction = hand.direction;
        var type = hand.type;
        var depth = 120;

        if(type == "left"){
            if(position[1] > depth){
                leftFlag = true;
                console.log("position[1]: " + position[1]);
                console.log("Frame: " + frame.id + " @ " + frame.timestamp);
                console.log("Left hand.")
            }
        } else {
            if(position[1] > depth){
                rightFlag = true;
                console.log("position[1]: " + position[1]);
                console.log("Frame: " + frame.id + " @ " + frame.timestamp);
                console.log("Right hand.")
            }
        }
    }else{
        if(rightFlag){
            // 右パンチイベント発火
            request.post(rightGpio + "function/out");
            request.post(rightGpio + "value/1");
            rightFlag = false;
            setTimeout(function(){
                request.post(rightGpio + "value/0");
            },1000);
        }else if(leftFlag){
            // 左パンチイベント発火
            request.post(leftGpio + "function/out");
            request.post(leftGpio + "value/1");
            leftFlag = false;
            setTimeout(function(){
                request.post(leftGpio + "value/0");
            },1000);
        }
    }
//    position = null;
});

//
setInterval(function () {
    console.log("position: " + position);
//    var time = frameCount / 2;
//    console.log("received " + frameCount + " frames @ " + time + "fps");
//    frameCount = 0;
}, 2000);

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
