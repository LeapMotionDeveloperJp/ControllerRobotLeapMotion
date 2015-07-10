var Cylon = require('cylon');

Cylon.robot({
    connections: {
        leap: { adaptor: 'leapmotion' },
        arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodemfd131' }
    },
    devices: {
        servo: { driver: 'servo', pin: 13, connection: 'arduino' }
    },
    work: function (my) {
        var angle = 46;
        var pushed = true;
        my.leap.on('frame', function (frame) {
            if (frame.hands.length > 0 && pushed) {
                my.servo.angle(angle);
                pushed = false;
                setTimeout(function () {
                    my.servo.angle(0);
                    setTimeout(function () {
                        my.servo.angle(angle);
                        setTimeout(function () {
                            my.servo.angle(0);

                        }, 200);
                    }, 800);
                }, 200);
            } else if (frame.hands.length == 0) {
                pushed = true;
            }
        });
    }
}).start();
