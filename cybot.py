#!/usr/bin/env python3
from flask import Flask, render_template, request
from smbus import SMBus

app = Flask(__name__)

bus = SMBus(1)
ADDRESS = 8

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
        send_i2c(*encode(body))
        return "Done"


def encode(data):
    # LEDs encoded in two bits: bx00
    if data['type'] == 'led':
        cmd = "L"
        val = [(data['left'] << 1) + data['right']]
        app.logger.debug(val)

    elif data['type'] == 'velocity':
        cmd = "M"
        modifier = data['modifier']
        linear = modifier * data['linear'] * LINEAR_MAX
        angular = modifier * data['angular'] * ANGULAR_MAX
        val = [*split_int(linear), *split_int(angular)]

    return cmd, val


def send_i2c(cmd, val):
    bus.write_i2c_block_data(ADDRESS, ord(cmd), val)


def split_int(num):
    '''Returns 2 bytes'''
    num = int(num)
    assert (-2**15 <= num <= 2**15 - 1)
    return num >> 8, num & 255


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
