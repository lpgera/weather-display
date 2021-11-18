require('dotenv').config()
const icons = require('./icons')
const display = require('./display')
const weather = require('./weather')

weather.getData().then(data => display.update(data))
