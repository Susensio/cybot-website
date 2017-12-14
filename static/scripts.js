////// PARAMETERS ////////
const TURBO = 2;
const SLOW = 0.2;


const LINEAR_BASE = 1000 / TURBO;
const ANGULAR_BASE = 1000 / TURBO;


const KEYMAP = {
    ledLeft: 46, // Del
    ledBoth: 35, // End
    ledRight: 34, // Av pag
    up: 38, // up arrow
    down: 40, // down arrow
    left: 37, // left arrow
    right: 39, // right arrow
    turbo: 16, // shift
    slow: 17 // ctrl
};


// Keyboard and mouse controls
$(document).ready(function() {
    $(document).keydown(function(event) {
        if (!event.originalEvent.repeat) {
            encodeEvent(event.keyCode, true);
        }
    });
    $(document).keyup(function(event) {
        encodeEvent(event.keyCode, false);
    });

    $("button.key").mousedown(function(event) {
        encodeEvent(KEYMAP[this.id], true);
    });
    $("button.key").mouseup(function(event) {
        encodeEvent(KEYMAP[this.id], false);
    });
});


let leds = {
    left: false,
    right: false
};
let velocity = {
    linear: 0,
    angular: 0,
    modifier: 1
};



function encodeEvent(keyCode, pressed) {
    // If pressed key is in KEYMAP
    if (Object.values(KEYMAP).indexOf(keyCode) > -1) {

        // LEDs
        if (keyCode == KEYMAP.ledLeft || keyCode == KEYMAP.ledRight) {
            if (keyCode == KEYMAP.ledRight) {
                leds.left = pressed;
            }
            if (keyCode == KEYMAP.ledBoth) {
                leds.left = pressed;
                leds.right = pressed;
            }
            if (keyCode == KEYMAP.ledLeft) {
                leds.right = pressed;
            }

            sendData({type: "leds", leds});
        }
        // Movement
        else {
            if (keyCode == KEYMAP.turbo) {
                velocity.modifier = pressed ? TURBO : 1;
            }
            if (keyCode == KEYMAP.slow) {
                velocity.modifier = pressed ? SLOW : 1;
            }
            if (keyCode == KEYMAP.up) {
                velocity.linear = pressed ? LINEAR_BASE : 0;
            }

            if (keyCode == KEYMAP.down) {
                velocity.linear = pressed ? -LINEAR_BASE : 0;
            }

            if (keyCode == KEYMAP.left) {
                velocity.angular = pressed ? ANGULAR_BASE : 0;
            }

            if (keyCode == KEYMAP.right) {
                velocity.angular = pressed ? -ANGULAR_BASE : 0;
            }

            sendData({type: "velocity", velocity});
        }
    }
};

function sendData(data) {
    $.ajax({
        type: "PUT",
        url: "/send",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
};