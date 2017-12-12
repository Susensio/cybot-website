keyMap = {
    ledLeft: 46,   // Del
    ledRight: 34,  // Av pag
    up: 38,        // up arrow
    down: 40,      // down arrow
    left: 37,      // left arrow
    right: 39,     // right arrow
    turbo: 16,     // shift
    slow: 17,      // ctrl
}

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

function encodeEvent(keyCode,pressed) {
    var command = "";
    if (keyCode == keyMap['ledLeft'] || keyCode == keyMap['ledRight']){  // LEDs
        command += "L"

    }
}

            if (event.keyCode == 103) { // numpad 7
                sendData("L1");
            }
            if (event.keyCode == 105) { // numpad 9
                sendData("L3");
            }


        if (event.keyCode == 103) { // numpad 7
            sendData("L0");
        }
        if (event.keyCode == 105) { // numpad 9
            sendData("L2");
        }