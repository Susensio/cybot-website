// Parameters
const LINEAR_MAX = 15;
const ANGULAR_MAX = 5;
const TURBO = 2;
const SLOW = 0.2;


const KEY_MAP = {
    ledLeft: 46, // Del
    ledRight: 34, // Av pag
    up: 38, // up arrow
    down: 40, // down arrow
    left: 37, // left arrow
    right: 39, // right arrow
    turbo: 16, // shift
    slow: 17, // ctrl
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


let leds = {
    left: false,
    right: false
}
let velocity = {
    linear: 0,
    angular: 0,
    modifier: 1
}

const LINEAR_BASE = LINEAR_MAX / TURBO;
const ANGULAR_BASE = ANGULAR_MAX / TURBO;


function encodeEvent(keyCode, pressed) {
    if (Object.values(KEY_MAP).indexOf(keyCode) > -1) {

        if (keyCode == KEY_MAP.ledLeft || keyCode == KEY_MAP.ledRight) { // LEDs
            if (keyCode == KEY_MAP.ledRight)
                leds.left = pressed;
            if (keyCode == KEY_MAP.ledLeft)
                leds.right = pressed;

            sendData(leds);

        } else { // Movement
            if (keyCode == KEY_MAP.turbo) {
                velocity.modifier = pressed ? TURBO : 1;
            }
            if (keyCode == KEY_MAP.slow) {
                velocity.modifier = pressed ? SLOW : 1;
            }
            if (keyCode == KEY_MAP.up)
                velocity.linear = pressed ? LINEAR_BASE : 0;

            if (keyCode == KEY_MAP.down)
                velocity.linear = pressed ? -LINEAR_BASE : 0;

            if (keyCode == KEY_MAP.left)
                velocity.angular = pressed ? ANGULAR_BASE : 0;

            if (keyCode == KEY_MAP.right)
                velocity.angular = pressed ? -ANGULAR_BASE : 0;

            sendData(velocity);
        }
    }
}

function sendData(data) {
    $.ajax({
        type: "POST",
        url: "/send",
        contentType: 'application/json',
        data: JSON.stringify(data)
    })
};