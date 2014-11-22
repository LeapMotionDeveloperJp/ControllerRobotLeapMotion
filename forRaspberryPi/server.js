require('leapjs/template/entry');
require('leapjs-plugins/main/hand-entry/leap.hand-entry');
var request = require('request');
var controller = new Leap.Controller()
//    .use('handEntry')
    ;
var frameCount = 0;
var position = [];
var rightFlag = false;
var leftFlag = false;
var rightGpio = "http://192.168.0.20:8000/GPIO/18/";
var leftGpio = "http://192.168.0.20:8000/GPIO/24/";
var depth = -120;
var axe = 2;

controller.on("frame", function (frame) {
    var handsLength = frame.hands.length;
    for (var i = 0; i < handsLength; i++) {
        var hand = frame.hands[i];
        position = hand.palmPosition;
        var velocity = hand.palmVelocity;
        var direction = hand.direction;
        var type = hand.type;
        if (type == "left") {
            if (position[axe] < depth && !leftFlag) {
                leftFlag = true;
                console.log("Frame: " + frame.id + " @ " + frame.timestamp);
            }
        } else {
            if (position[axe] < depth && !rightFlag) {
                rightFlag = true;
                console.log("Frame: " + frame.id + " @ " + frame.timestamp);
            }
        }
    }
    if (handsLength < 1) {
        if (rightFlag) {
            // 右パンチイベント発火
            console.log("Right hand.");
            rightFlag = false;
            request
                .post(rightGpio + "function/out")
                .on('error', function(err) {
                    console.log(err)
                });
            request
                .post(rightGpio + "value/1")
                .on('error', function(err) {
                    console.log(err)
                });
            setTimeout(function () {
                request
                    .post(rightGpio + "value/0")
                    .on('error', function(err) {
                        console.log(err)
                    });
            }, 1000);
        } else if (leftFlag) {
            // 左パンチイベント発火
            console.log("Left hand.");
            leftFlag = false;
            request
                .post(leftGpio + "function/out")
                .on('error', function(err) {
                    console.log(err)
                });
            request
                .post(leftGpio + "value/1")
                .on('error', function(err) {
                    console.log(err)
                });
            setTimeout(function () {
                request
                    .post(leftGpio + "value/0")
                    .on('error', function(err) {
                        console.log(err)
                    });
            }, 1000);
        }
    }
//    position = null;
});

//
setInterval(function () {
    if(position.length > 0){
        console.log("position[axe]: " + position[axe]);
    }
//    var time = frameCount / 2;
//    console.log("received " + frameCount + " frames @ " + time + "fps");
//    frameCount = 0;
}, 1000);

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
