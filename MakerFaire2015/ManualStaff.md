# <span style="color:purple;">（スタッフ用）LeapMotion と VR でリアル体験、レースジョッキー</span>
## マニュアル
1. ユーザにマニュアルを読んでもらい注意点などに同意してもらいます
1. （ユーザ）左手で手綱をつかみ、右足から乗馬マシンにまたがります
1. ヘッドマウントディスプレイの表示を確認します
1. （ユーザ）スマートフォンがセットしてあるヘッドマウントディスプレイをかぶります
1. （ユーザ）背筋を伸ばして、手綱をしっかり握ります
2. （ユーザ）乗馬マシンは常足(なみあし)程度にゆれるので、落ちないように股に力をいれます
2. LeapMotionが所定の位置にあることを確認します
1. Arduinoが乗馬マシンの所定の位置にあることを確認します
1. ダービーロボットを開始位置に移動します
1. ラズベリーパイのmjpg_streamerとwebiopiの起動を確認します
1. （初回のみ）LeapMotionのサービス（node RodeoMachine.js）を実行します。
1. 以上をもう１度繰り返してBマシンを設定します
2. LeapMotionの起動コマンド（node Controller.js）を実行します。
1. 設定が完了したら開始のラッパをつたえます
1. （ユーザ）スタートのラッパに併せて手に持った手綱を前に倒すと動きだします
1. （ユーザ）手綱に併せてダービーロボと乗馬マシンが動作します
1. 1分以上（仮）の場合はゲームオーバーとして終了をつたえます
1. （ユーザ）ゴールしたらラッパが鳴ります
1. 勝者をたたえます

## 注意
- スマートフォンの充電が切れた場合などで急にゲームが止まってしまう場合もあるのでご了承ください
- 乗馬マシンは動くので落ちないように注意してください
- 親御さんはお子さんが乗馬マシンから落ちないように注意して見守ってください
- ヘッドマウントディスプレイは酔うので、体調が悪い方やおなかが空いている方は利用しないでください
- 小学生未満のちいさいお子さんは揺れがあるので利用は控えてください
- 多少タイムテーブルと時間がずれる場合があります

## 例外
例外が発生したら @ega1979 プロデューサーへ報告しましょ笑

1. 連絡方法 フェイスブック

## タイムテーブル
### 8月1日
- 12:00 - 13:00 営業
- 13:00 - 13:30 充電中
- 13:30 - 14:30 営業
- 14:30 - 15:00 充電中
- 15:00 - 16:00 営業
- 16:00 - 16:30 充電中
- 16:30 - 17:30 営業
- 17:30 - 18:00 充電中
- 18:00 - 19:00 営業

### 8月2日
- 10:00 - 11:00 営業 
- 11:00 - 11:30 充電中 
- 11:30 - 12:30 営業 
- 12:30 - 13:00 充電中 
- 13:00 - 14:00 営業 
- 14:00 - 14:30 充電中 
- 14:30 - 15:30 営業 
- 15:30 - 16:00 充電中 
- 16:00 - 17:00 営業 
- 17:00 - 17:30 充電中 
- 17:30 - 18:00 営業 

## 充電するもの
- スマートフォン x 2
- モバイルバッテリー x 2
- 乾電池

### LeapMotion Developers JP
- https://www.facebook.com/groups/leapmotionJp/
- へーって思ったら、Facebookで「leapmotionJp」で検索して「メンバー追加」してください m(__)m
