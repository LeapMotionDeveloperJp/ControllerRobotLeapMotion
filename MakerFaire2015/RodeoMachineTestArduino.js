/**
 * LeapMotion Server
 * @module cylon
 * @module ws
 * @module request
 * */
var request = require('request');
var Cylon = require('cylon');

var isGaming = false;
var isReady = false;

const ARDUINO_PIN = 13;
var LeapMotionService = Cylon.robot({
    connections: {
        leap: { adaptor: 'leapmotion' },
        arduino: { adaptor: 'firmata', port: 'COM3' } // for Windows
    },
    devices: {
        servo: { driver: 'servo', pin: ARDUINO_PIN, connection: 'arduino' }
    },
    work: function (my) {
        const ANGLE = 46;
        const RESET_ANGLE = 0;
        const ACTIVITY_TIME = 4000;
        const INTERVAL_LONG = 500;
        const INTERVAL_SHORT = 200;
        var isWhipping = false;

        my.servo.angle(RESET_ANGLE);
        my.leap.on('frame', function (frame) {
            if (frame.hands.length > 0 && !isWhipping && isGaming) {
                console.log('Whip ヽ(ﾟДﾟ)ﾉ');
                my.servo.angle(ANGLE);
                isWhipping = true;
                setTimeout(function () {
                    my.servo.angle(RESET_ANGLE);
                    setTimeout(function () {
                        console.log('Be tired (u｡u *)');
                        my.servo.angle(ANGLE);
                        setTimeout(function () {
                            my.servo.angle(RESET_ANGLE);
                            setTimeout(function () {
                                console.log('Stop Interval');
                                isWhipping = false;
                            }, INTERVAL_LONG);
                        }, INTERVAL_SHORT);
                    }, ACTIVITY_TIME);
                }, INTERVAL_SHORT);
                console.log('Start Interval');
            }
        });
    }
});
console.log('Start Listening');
console.log('Wait Service');
LeapMotionService.start();
