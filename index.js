require('dotenv').config()
const icons = require('./icons')
const display = require('./display')
const weather = require('./weather')
const CronJob = require('cron').CronJob

function tick() {
  weather.getData().then(
    data => display.update(data)
  ).catch(
    err => console.error(err)
  )
}

const runOnInit = true
const start = true

new CronJob(process.env.CRON_CONFIG || '0 */10 * * * *', tick, null, start, null, null, runOnInit)
