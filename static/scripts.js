keyMap = {
    ledLeft: 46, // Del
    ledRight: 34, // Av pag
    up: 38, // up arrow
    down: 40, // down arrow
    left: 37, // left arrow
    right: 39, // right arrow
    turbo: 16, // shift
    slow: 17, // ctrl
}

var speed = 3;

$(document).ready(function() {
    $(document).keydown(function(event) {
        if (!event.repeat) {
            encodeEvent(event.keyCode, true);
        }
    });

    $(document).keyup(function(event) {
        if (!event.repeat) {
            encodeEvent(event.keyCode, false);
        }
    });
});

function sendData(data) {
    $.ajax({
        type: "POST",
        url: "/send",
        contentType: 'application/json',
        data: JSON.stringify({
            "command": data
        })
    })
};

function encodeEvent(keyCode, pressed) {
    if (keyCode == keyMap['ledLeft'] || keyCode == keyMap['ledRight']) { // LEDs
        var command = "L";
        if (keyCode == keyMap['ledLeft'])
            command += pressed ? 1 : 0;
        if (keyCode == keyMap['ledRight'])
            command += pressed ? 3 : 2;
        sendData(command);
    }

    if (keyCode == keyMap['turbo'])
        speed = pressed ? 5 : 3;

    if (keyCode == keyMap['slow'])
        speed = pressed ? 1 : 3;

    if (keyCode == keyMap['up'] ||
        keyCode == keyMap['down'] ||
        keyCode == keyMap['left'] ||
        keyCode == keyMap['right']) {
        var command = "M";

    }
}
