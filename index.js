require('dotenv').config()
const CronJob = require('cron').CronJob
const display = require('./src/display')
const weather = require('./src/weather')

function tick() {
  weather.getData().then(
    data => display.update(data)
  ).catch(
    err => console.error(err)
  )
}

const runOnInit = true
const start = true

const job = new CronJob(process.env.CRON_CONFIG || '0 */10 * * * *', tick, null, start, null, null, runOnInit)

process.on('SIGINT', () => {
  job.stop()
})
