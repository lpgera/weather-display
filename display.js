const i2c = require('i2c-bus')
const Oled = require('oled-i2c-bus')

const i2cBus = i2c.openSync(1)

const display = new Oled(i2cBus, {
  width: 128,
  height: 64,
  address: parseInt(process.env.DISPLAY_I2C_ADDRESS || 0x3c),
})

module.exports = display
