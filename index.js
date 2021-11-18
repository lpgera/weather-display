const i2c = require('i2c-bus')
const Oled = require('oled-i2c-bus')
const font = require('oled-font-5x7')
const PNG = require('pngjs').PNG
const fs = require('fs')

const i2cBus = i2c.openSync(1)

const opts = {
  width: 128,
  height: 64,
  address: 0x3c
};

const oled = new Oled(i2cBus, opts)

const file = fs.readFileSync('icons/moon.png')
var png = PNG.sync.read(file)

oled.clearDisplay()
oled.turnOnDisplay()
oled.drawRGBAImage(png, 0, 0)
oled.setCursor(70, 0)
oled.writeString(font, 1, 'Temp.:', 1, false)
oled.setCursor(70, 11)
oled.writeString(font, 2, '-12°C', 0, false)
oled.setCursor(70, 35)
oled.writeString(font, 1, 'Rain:', 1, false)
oled.setCursor(70, 45)
oled.writeString(font, 2, '100%', 0, false)
