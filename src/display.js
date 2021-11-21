const i2c = require('i2c-bus')
const Oled = require('oled-i2c-bus')
const font = require('oled-font-5x7')

const i2cBus = i2c.openSync(1)

const display = new Oled(i2cBus, {
  width: 128,
  height: 64,
  address: parseInt(process.env.DISPLAY_I2C_ADDRESS || 0x3c),
})

function update({ icon, temperature, probabilityOfPrecipitation }) {
  display.clearDisplay()
  display.drawRGBAImage(icon, 0, 0)
  display.setCursor(70, 0)
  display.writeString(font, 1, 'Temp.:', 1, false)
  display.setCursor(70, 11)
  display.writeString(font, 2, `${temperature}°C`, 0, false)
  display.setCursor(70, 35)
  display.writeString(font, 1, 'Rain 4h:', 1, false)
  display.setCursor(70, 45)
  display.writeString(font, 2, `${probabilityOfPrecipitation}%`, 0, false)
}

module.exports = {
  update,
}
