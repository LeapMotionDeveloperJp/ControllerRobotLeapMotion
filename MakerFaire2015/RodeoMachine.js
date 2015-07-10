/**
 * A module control Rodeo Machine
 * @module cylon
 * @module leap
 */
var Cylon = require('cylon');
var arduinoPin = 13;

Cylon.robot({
    connections: {
        leap: { adaptor: 'leapmotion' },
        arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodemfd131' }
    },
    devices: {
        servo: { driver: 'servo', pin: arduinoPin, connection: 'arduino' }
    },
    work: function (my) {
        var angle = 46;
        var resetAngle = 0;
        var isPushed = true;
        var intervalLong = 1000;
        var intervalShort = 200;
        my.leap.on('frame', function (frame) {
            if (frame.hands.length > 0 && isPushed) {
                my.servo.angle(angle);
                isPushed = false;
                setTimeout(function () {
                    my.servo.angle(resetAngle);
                    setTimeout(function () {
                        my.servo.angle(angle);
                        setTimeout(function () {
                            my.servo.angle(resetAngle);
                        }, intervalShort);
                    }, intervalLong);
                }, intervalShort);
            } else if (frame.hands.length == 0) {
                isPushed = true;
            }
        });
    }
}).start();
