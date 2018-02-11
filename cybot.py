#!/usr/bin/env python3
from flask import Flask, render_template, request
from spidev import SpiDev

app = Flask(__name__)

spi = SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 15200


LINEAR_MAX = 15   # mm/s
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
        send_spi(encode(body))
        return "Done"


def encode(data):
    # LEDs encoded in two bits: bx00
    encoded = []
    if data['type'] == 'led':
        cmd = "L"
        val = [(data['left'] << 1) + data['right']]
        app.logger.debug(val)

    elif data['type'] == 'velocity':
        cmd = "M"
        modifier = data['modifier']
        linear = modifier * data['linear']
        angular = modifier * data['angular']
        val = [*split_int(linear), *split_int(angular)]

    app.logger.debug(val)

    encoded.append(ord(cmd))
    encoded.extend(val)
    return encoded


def send_spi(data):
    parity_byte = sum(data) % 256

    spi.writebytes([*data, parity_byte])


def to_char(num):
    num = int(num)
    if num > 127:
        num = 127
    if num < -128:
        num = -128
    return num


def split_int(num):
    '''Returns 2 bytes'''
    num = int(num)
    assert (-2**15 <= num <= 2**15 - 1)
    return num >> 8, num & 255


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
