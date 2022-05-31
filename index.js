import 'dotenv/config'
import { CronJob } from 'cron'
import * as display from './src/display.js'
import * as weather from './src/weather.js'

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
