require('leapjs/template/entry');
require('leapjs-plugins/main/screen-position/leap.screen-position');
var request = require('request');
var controller = new Leap.Controller();
var frameCount = 0;
var position = [];
var rightFlag = false;
var leftFlag = false;
var rightGpioUrl = "http://192.168.0.20:8000/GPIO/25/";
var leftGpioUrl = "http://192.168.0.20:8000/GPIO/23/";
var distance = -120;
var axe = 2;
if(process.argv[2] == "y"){
    console.log("start Y axe");
    distance = 200;
    axe = 1;
}
controller.on("frame", function (frame) {
    var handsLength = frame.hands.length;
    for (var i = 0; i < handsLength; i++) {
        var hand = frame.hands[i];
        position = hand.palmPosition;
//        console.log("position: " + position);
        var velocity = hand.palmVelocity;
        var direction = hand.direction;
        var type = hand.type;
        if(axe == 2){
            if (type != "left") {
                if (position[axe] < distance && !leftFlag) {
                    leftFlag = true;
                    console.log("Frame: " + frame.id + " @ " + frame.timestamp);
                }
            } else {
                if (position[axe] < distance && !rightFlag) {
                    rightFlag = true;
                    console.log("Frame: " + frame.id + " @ " + frame.timestamp);
                }
            }
        }else{
            if (type != "left") {
                if (position[axe] > distance && !leftFlag) {
                    leftFlag = true;
                    console.log("Frame: " + frame.id + " @ " + frame.timestamp);
                }
            } else {
                if (position[axe] > distance && !rightFlag) {
                    rightFlag = true;
                    console.log("Frame: " + frame.id + " @ " + frame.timestamp);
                }
            }
        }
    }
    if (handsLength < 1) {
        if (rightFlag) {
            // 右パンチイベント発火
            console.log("Right hand.");
            rightFlag = false;
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
            }, 1000);
        } else if (leftFlag) {
            // 左パンチイベント発火
            console.log("Left hand.");
            leftFlag = false;
            request
                .post(leftGpioUrl + "function/out")
                .on('error', function(err) {
                    console.log(err)
                });
            request
                .post(leftGpioUrl + "value/1")
                .on('error', function(err) {
                    console.log(err)
                });
            setTimeout(function () {
                request
                    .post(leftGpioUrl + "value/0")
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
