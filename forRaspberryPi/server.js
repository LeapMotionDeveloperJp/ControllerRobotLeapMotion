require('leapjs/template/entry');

var frameCount = 0;
var controller = new Leap.Controller();
controller.on("frame", function (frame) {
//    console.log("Frame: " + frame.id + " @ " + frame.timestamp);
    frameCount++;
    if(frameCount > 1000){
        if(frame.hands.length > 0)
        {
            var hand = frame.hands[0];
            var position = hand.palmPosition;
            console.log("position: " + position);
            var velocity = hand.palmVelocity;
            console.log("velocity: " + velocity);
            var direction = hand.direction;
            console.log("direction: " + direction);
            var type = hand.type;
            if(type == "left"){
                console.log("Left hand.");
            } else {
                console.log("Right hand.")
            }
        }
        frameCount = 0;
    }
});

//
//setInterval(function () {
//    var time = frameCount / 2;
//    console.log("received " + frameCount + " frames @ " + time + "fps");
//    frameCount = 0;
//}, 2000);

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
