/**
 * A module control LeapMotion Start/Stop
 * @module ws
 */
const MACHINE_A = "ws://127.0.0.1:8080";
const MACHINE_B = "ws://127.0.0.2:8080";

var WebSocket = require("ws")
    , ws = new WebSocket(MACHINE_A);
var WebSocket2 = require("ws")
    , ws2 = new WebSocket2(MACHINE_B);
const INTERVAL = 4000;

ws.on("open", function () {
    ws.send("start");
    setTimeout(function () {
        ws.send("stop");
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