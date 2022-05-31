import i2c from 'i2c-bus'
import Oled from 'oled-i2c-bus'
import font from 'oled-font-5x7'

const i2cBus = i2c.openSync(parseInt(process.env.DISPLAY_I2C_BUS || 1))

const display = new Oled(i2cBus, {
  width: 128,
  height: 64,
  address: parseInt(process.env.DISPLAY_I2C_ADDRESS || 0x3c),
})

export function update({ icon, temperature, probabilityOfPrecipitation }) {
  const paddedTemperature = String(temperature).padStart(3, ' ')
  const paddedPop = String(probabilityOfPrecipitation).padStart(3, ' ')

  display.clearDisplay()
  display.drawRGBAImage(icon, 0, 0)
  display.setCursor(68, 0)
  display.writeString(font, 3, paddedTemperature, 1, false)
  display.setCursor(117, 0)
  display.writeString(font, 1, `°C`, 1, false)
  display.setCursor(80, 30)
  display.writeString(font, 1, 'Rain 4h:', 1, false)
  display.setCursor(68, 40)
  display.writeString(font, 3, paddedPop, 1, false)
  display.setCursor(117, 40)
  display.writeString(font, 2, '%', 1, false)
}
