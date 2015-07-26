/**
 * LeapMotion Server
 * @module cylon
 * @module ws
 * @module request
 * */
var request = require('request');
var Cylon = require('cylon');

var isGaming = true;
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        if (message == 'start') {
            if(isGaming){
                console.log('Start Service');
                LeapMotionService.start();
            }else{
                isGaming = true;
            }
        } else if(message == 'stop'){
            console.log('Stop Service');
            isGaming = false;
            ws.send('server_stop');
        }
    });
});

const ARDUINO_PIN = 13;
var LeapMotionService = Cylon.robot({
    connections: {
        leap: { adaptor: 'leapmotion' },
        arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodemfd131' }
    },
    devices: {
        servo: { driver: 'servo', pin: ARDUINO_PIN, connection: 'arduino' }
    },
    work: function (my) {
        const GPIO_PIN = '/GPIO/24/';
        const GPIO_URL = 'http://192.168.179.11:8080' + GPIO_PIN;   // for A
//        const GPIO_URL = 'http://192.168.179.13:8080' + GPIO_PIN;   // for B
        const ANGLE = 46;
        const RESET_ANGLE = 0;
        const ACTIVITY_TIME = 4000;
        const INTERVAL_LONG = 500;  // Todo なくてもいいような
        const INTERVAL_SHORT = 200;
        const DIRECTION = 'out';
        var isPushed = true;
        my.leap.on('frame', function (frame) {
            if (frame.hands.length > 0 && isPushed) {
                console.log('Whip ヽ(ﾟДﾟ)ﾉ');
                my.servo.angle(ANGLE);
                request
                    .post(GPIO_URL + 'function/' + DIRECTION)
                    .on('error', function (err) {
                        console.log('Error GPIO %s',err)
                    });
                request
                    .post(GPIO_URL + 'value/1')
                    .on('error', function (err) {
                        console.log('Error GPIO %s',err)
                    });
                isPushed = false;
                setTimeout(function () {
                    my.servo.angle(RESET_ANGLE);
                    setTimeout(function () {
                        console.log('Be tired (u｡u *)');
                        my.servo.angle(ANGLE);
                        request
                            .post(GPIO_URL + 'value/0')
                            .on('error', function (err) {
                                console.log('Error GPIO %s',err)
                            });
                        setTimeout(function () {
                            my.servo.angle(RESET_ANGLE);
                            setTimeout(function () {
                                console.log('Start Interval');
                            }, INTERVAL_LONG);
                        }, INTERVAL_SHORT);
                    }, ACTIVITY_TIME);
                }, INTERVAL_SHORT);
                console.log('Stop Interval');
            } else if (frame.hands.length == 0) {
                isPushed = true;
            }
        });
    }
});
console.log('Start Listening');
console.log('Wait Service');
