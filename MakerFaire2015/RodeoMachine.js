/**
 * A module control Rodeo Machine
 * @module cylon
 */
var Cylon = require('cylon');
const ARDUINO_PIN = 13;

Cylon.robot({
    connections: {
        leap: { adaptor: 'leapmotion' },
        arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodemfd131' }
    },
    devices: {
        servo: { driver: 'servo', pin: ARDUINO_PIN, connection: 'arduino' }
    },
    work: function (my) {
        const ANGLE = 46;
        const RESET_ANGLE = 0;
        const INTERVAL_LONG = 1000;
        const INTERVAL_SHORT = 200;
        var isPushed = true;
        my.leap.on('frame', function (frame) {
            if (frame.hands.ANGLE > 0 && isPushed) {
                my.servo.angle(ANGLE);
                isPushed = false;
                setTimeout(function () {
                    my.servo.angle(RESET_ANGLE);
                    setTimeout(function () {
                        my.servo.angle(ANGLE);
                        setTimeout(function () {
                            my.servo.angle(RESET_ANGLE);
                        }, INTERVAL_SHORT);
                    }, INTERVAL_LONG);
                }, INTERVAL_SHORT);
            } else if (frame.hands.length == 0) {
                isPushed = true;
            }
        });
    }
}).start();
