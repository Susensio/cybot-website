#!/usr/bin/env python3
from flask import Flask, render_template, request
from smbus import SMBus

app = Flask(__name__)

bus = SMBus(1)
ADDRESS = 8

LINEAR_MAX = 0.15  # m/s
ANGULAR_MAX = 5   # rad/s


@app.route('/')
def index():
    return render_template('index.html',
                           title='Cybot control')


@app.route('/send', methods=['PUT'])
def send():
    if request.method == 'PUT':
        body = request.get_json()
        app.logger.debug(body)
        send_i2c(encode(body))
        return "Done"


def encode(data_map):
    # LEDs encoded in two bits: bx00
    if data_map['type'] == 'led':
        cmd = "L"
        val = data_map['left'] << 1 + data_map['right']

    elif data_map['type'] == 'velocity':
        raw = "M"
        #################
        return cmd, val


def send_i2c(cmd, val):
    cmd = ord(cmd)
    val = list(val)
    bus.write_i2c_block_data(ADDRESS, cmd, val)

# int.to_bytes(length, byteorder, *, signed=False)
# struct — Interpret bytes as packed binary data
# int8_t

# /** \ingroup avr_stdint
#     8-bit signed type. */

# typedef signed char int8_t;

# /** \ingroup avr_stdint
#     8-bit unsigned type. */

# typedef unsigned char uint8_t;


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
