/**
 * LeapMotion Server
 * @module ws
 * @module request
 * @module leapjs
 */
require('leapjs/template/entry');
var controller = new Leap.Controller();
var request = require('request');
const GPIO_URL = "http://192.168.0.20:8000/GPIO/24/";
const DISTANCE = -120;
const SCALE = 500;
var isUpEvent = true;
var isGaming = true;

var actionLeapMotion = function () {
    controller.on("frame", function (frame) {
        if(!isGaming)
            return;
        var handsLength = frame.hands.length;
        if (handsLength == 2) {
            isUpEvent = true;
            console.log("UP");
        }
        if ((isUpEvent) && handsLength == 0) {
            console.log("Down");
            isUpEvent = false;
            request
                .post(GPIO_URL + "function/out")
                .on('error', function (err) {
                    console.log(err)
                });
            request
                .post(GPIO_URL + "value/1")
                .on('error', function (err) {
                    console.log(err)
                });
            setTimeout(function () {
                request
                    .post(GPIO_URL + "value/0")
                    .on('error', function (err) {
                        console.log(err)
                    });
            }, SCALE);
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
    controller.connect();
    console.log("\nWaiting for device to connect...");
}

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        if (message == "start") {
            if(isGaming){
                actionLeapMotion();
            }else{
                isGaming = true;
            }
            console.log('received: game %s', message);
            console.log("\nWaiting for device to connect...");
        } else if(message == "stop"){
            isGaming = false;
            console.log("received: game stop");
            ws.send('server_stop');
        } else {
            console.log("Type to run \"node Controller.js\"")
        }
    });
});
