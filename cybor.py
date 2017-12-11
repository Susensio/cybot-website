from flask import Flask, url_for, render_template, request
from smbus import SMBus

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', 
            title='Cybor control')

@app.route('/send', methods=['POST'])
def send():
    if request.method == 'POST':
        app.logger.debug(request.get_json()["command"])
        send_i2c(request.get_json()["command"])
        return "Done"

bus = SMBus(1)
address = 8
def send_i2c(data):
    raw = list(map(ord, data))
    cmd = raw[0]
    val = raw[1:]
    bus.write_i2c_block_data(address, cmd, val)

if __name__ == '__main__':
    app.run()

