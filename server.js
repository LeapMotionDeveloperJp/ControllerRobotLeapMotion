var WebSocket = require('ws')
    , ws = new WebSocket('ws://localhost:6437');
ws.on('message', function (message) {
    var frame = JSON.parse(message);
//    console.log('received: %s', JSON.stringify(message));

//    var frame = JSON.stringify(message);
//    var hands = JSON.stringify(frame.hands);
//    console.log('received: %s', frame.currentFrameRate);
    console.log('received: %s', JSON.stringify(frame.hands));
    if(frame.hands != null)
    {
        var hand = frame.hands[0];
//        var position = hand.palmPosition;
//        var velocity = hand.palmVelocity;
//        var direction = hand.direction;
//        console.log('received: %s', JSON.stringify(hand.arm));
    }
});

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

