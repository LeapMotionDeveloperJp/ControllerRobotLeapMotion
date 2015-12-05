/**
 * LeapMotion Server
 * @module cylon
 * @module ws
 * @module request
 * */
var request = require('request');
var Cylon = require('cylon');
var Firebase = require("firebase");

var isGaming = false;
var isReady = false;
var myDataRef = new Firebase('https://sweltering-torch-5950.firebaseio.com/web/data');

const ARDUINO_PIN = 13;
var LeapMotionService = Cylon.robot({
    connections: {
        leap: { adaptor: 'leapmotion' },
        // arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodemfd131' } // for Mac
        arduino: { adaptor: 'firmata', port: 'COM4' } // for Windows
    },
    devices: {
        servo: { driver: 'servo', pin: ARDUINO_PIN, connection: 'arduino' }
    },
    work: function (my) {
        const PIN7 = '/GPIO/7/';
        const PIN8 = '/GPIO/8/';
        const PIN23 = '/GPIO/25/';
        const PIN24 = '/GPIO/9/';
        const GPIO_URL = 'http://192.168.179.9:8000';   // for A
//        const GPIO_URL = 'http://192.168.179.13:8080';   // for B
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
                request
                    .post(GPIO_URL + PIN7 + 'function/in'
                    ,function (error, response, body){
                        if(error){
                            console.log(error);
                        }
                    });
                request
                    .post(GPIO_URL + PIN8 + 'function/out'
                    ,function (error, response, body){
                        if(error){
                            console.log(error);
                        }
                    });
                request
                    .post(GPIO_URL + PIN8 + 'value/1'
                    ,function (error, response, body){
                        if(error){
                            console.log(error);
                        }
                    });
                request
                    .post(GPIO_URL + PIN23 + 'function/in'
                    ,function (error, response, body){
                        if(error){
                            console.log(error);
                        }
                    });
                request
                    .post(GPIO_URL + PIN24 + 'function/out'
                    ,function (error, response, body){
                        if(error){
                            console.log(error);
                        }
                    });
                request
                    .post(GPIO_URL + PIN24 + 'value/1'
                    ,function (error, response, body){
                        if(error){
                            console.log(error);
                        }
                    });
                isWhipping = true;
                setTimeout(function () {
                    my.servo.angle(RESET_ANGLE);
                    setTimeout(function () {
                        console.log('Be tired (u｡u *)');
                        my.servo.angle(ANGLE);
                        request
                            .post(GPIO_URL + PIN8 + 'value/0'
                            ,function (error, response, body){
                                if(error){
                                    console.log(error);
                                }
                            });
                        request
                            .post(GPIO_URL + PIN24 + 'value/0'
                            ,function (error, response, body){
                                if(error){
                                    console.log(error);
                                }
                            });
                        setTimeout(function () {
                            my.servo.angle(RESET_ANGLE);
                            setTimeout(function () {
//                                console.log('Stop Interval');
                                isWhipping = false;
                            }, INTERVAL_LONG);
                        }, INTERVAL_SHORT);
                    }, ACTIVITY_TIME);
                }, INTERVAL_SHORT);
//                console.log('Start Interval');

                myDataRef.push(
                    {step: 1}, function (error) {
                        if (error) console.log("Data could not be saved." + error);
                    });

            }
        });
    }
});
console.log('Start Listening');
console.log('Wait Service');
if(!isReady){
    console.log('✿❁✿❁✿❁ Start Service ✿❁✿❁✿❁');
    LeapMotionService.start();
    isReady = true;
    isGaming = true;
}else{
    isGaming = true;
}

function secondLog(){
    console.log('.');
}

const INTERVAL = 1000 * 60;  // 1 min
const SEC1_INTERVAL = 1000;
var oneSecond = setInterval(secondLog, SEC1_INTERVAL);
setTimeout(function () {
    console.log('✿❁✿❁✿❁ Stop Service ✿❁✿❁✿❁');
    isGaming = false;
    clearInterval(oneSecond);
}, INTERVAL);
