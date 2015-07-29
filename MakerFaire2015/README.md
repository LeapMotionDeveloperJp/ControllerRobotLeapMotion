# LeapMotion と VR でリアル体験、レースジョッキー
メイカー・フェア・トウキョウ2015 出展用

## Tutorial

### CylonJsの準備 (Macの例)

1. [Gort](http://gort.io/)の実行ファイルをダウンロード
1. アルディーノのシリアルポート名をスキャンしてアルディーノのFirmataファームウェアをアップデート

```
gort scan usb
/dev/cu.serial1         /dev/tty.serial1
/dev/cu.usbmodem14a31   /dev/tty.usbmodem14a31
gort arduino upload firmata /dev/cu.usbmodem14a31
```

### 実行の例 (Macの例)

```
git clone https://github.com/LeapMotionDeveloperJp/ControllerRobotLeapMotion.git
cd ControllerRobotLeapMotion/MakerFaire2015
npm install
sed -i '' 's/\/dev\/tty.usbmodemfd131/\/dev\/************/g' RodeoMachine.js
node RodeoMachine.js
node Controller.js
```

## Configuration
![Image of ConfigureFig1](https://github.com/LeapMotionDeveloperJp/ControllerRobotLeapMotion/blob/master/MakerFaire2015/ConfigureFig1.jpg)

### RaspberryPi

#### GPIO

- Pin 入力 23
- Pin 出力 24

#### Port

- 8080 WeblOPi
- 8000 mjpg-streamer

### Arduino

#### PWM

- Pin　13

## System dependencies

- NodeJs v0.10.26
- Python 2.7.9
- [LeapMotion](https://www.leapmotion.com)
- [WeblOPi](https://code.google.com/p/webiopi/)
- [mjpg-streamer](http://code.google.com/p/mjpg-streamer/)
- [Raspberry Pi](https://www.raspberrypi.org)
- [Arduino](https://www.arduino.cc)
- ロデオマシンほか

## License
Apache License, Version 2.0


