/**
 * A module control LeapMotion Server Start/Stop
 * @module ws
 */
var arguments = process.argv.slice(2);

// const MACHINE_A = "ws:127.0.0.1:8080";
const MACHINE_A = "ws:192.168.179.10:8080";    // for A
const MACHINE_B = "ws:192.168.179.12:8090";    // for B

var WebSocket = require("ws")
    , ws = new WebSocket(MACHINE_A);
var WebSocket2 = require("ws")
    , ws2 = new WebSocket2(MACHINE_B);
const INTERVAL = 10000;   1000 * 60  // 1 min
const SEC1_INTERVAL = 1000;
var oneSecond = setInterval(secondLog, SEC1_INTERVAL);

ws.on("open", function () {
    ws.send("start");
    console.log('Start Game');
    oneSecond;
    setTimeout(function () {
        ws.send("stop");
        clearInterval(oneSecond);
        console.log('Stop Game');
    }, INTERVAL);
});
ws2.on("open", function () {
    ws2.send("start");
    setTimeout(function () {
        ws2.send("stop");
    }, INTERVAL);
});
ws2.on("message", function (message) {
    if (message == "server_stop")
        process.exit(code = 0);
});

function secondLog(){
    console.log('.');
}
