# LeapMotion と VR でリアル体験、レースジョッキー
メイカー・フェア・トウキョウ2015 出展用

## Tutorial

### CylonJsの準備 (Mac)

1. [Gort](http://gort.io/)の実行ファイルをダウンロード
1. アルディーノのシリアルポート名をスキャンしてアルディーノのFirmataファームウェアをアップデート

```
gort scan usb
/dev/cu.serial1         /dev/tty.serial1
/dev/cu.usbmodem14a31   /dev/tty.usbmodem14a31
gort arduino upload firmata /dev/cu.usbmodem14a31
```

### 実行の例 (Mac)

```
git clone https://github.com/LeapMotionDeveloperJp/ControllerRobotLeapMotion.git
cd MakerFaire2015
npm install
sed -i '' 's/\/dev\/tty.usbmodemfd131/***************/g' RodeoMachine.js
node RodeoMachine.js
node Controller.js
```

## Configuration

- [LeapMotion](https://www.leapmotion.com)
- [WeblOPi](https://code.google.com/p/webiopi/)
- [mjpg-streamer](http://code.google.com/p/mjpg-streamer/)
- [Raspberry Pi](https://www.raspberrypi.org)
- [Arduino](https://www.arduino.cc)
- ロデオマシンほか LeapMotionDeveloperJp/ControllerRobotLeapMotion#1

![Image of ConfigureFig1](https://github.com/LeapMotionDeveloperJp/ControllerRobotLeapMotion/blob/master/MakerFaire2015/ConfigureFig1.jpg)

## System dependencies

- NodeJs v0.10.26
- Python

## License
Apache License, Version 2.0


