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

    // La traduccion a comandos deberia hacerse en python, aqui le mando info a maás alto nivel
    var command;
    if (keyCode == keyMap['ledLeft'] || keyCode == keyMap['ledRight']) { // LEDs
        command = "L";
        if (keyCode == keyMap['ledLeft'])
            command += pressed ? 1 : 0;
        if (keyCode == keyMap['ledRight'])
            command += pressed ? 3 : 2;
    } else {
        command = "M";
        var v = 0;
        var w = 0;
        if (keyCode == keyMap['up']){
            v += pressed ? 100 : -100;
        }
        if (keyCode == keyMap['down']){
            v += pressed ? -100 : 100;
        }
        if (keyCode == keyMap['right']){
            v += pressed ? 100 : -100;
        }
        if (keyCode == keyMap['left']){
            v += pressed ? -100 : 100;
        }
    }
    
    sendData(command);
}
