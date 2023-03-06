import fs from 'fs'

export const iconMap = {
  '01d': fs.readFileSync('./icons/sun.png'),
  '01n': fs.readFileSync('./icons/sun.png'),
  '02d': fs.readFileSync('./icons/cloudy-day.png'),
  '02n': fs.readFileSync('./icons/cloudy-night.png'),
  '03d': fs.readFileSync('./icons/cloud.png'),
  '03n': fs.readFileSync('./icons/cloud.png'),
  '04d': fs.readFileSync('./icons/clouds.png'),
  '04n': fs.readFileSync('./icons/clouds.png'),
  '09d': fs.readFileSync('./icons/rain.png'),
  '09n': fs.readFileSync('./icons/rain.png'),
  '10d': fs.readFileSync('./icons/rain.png'),
  '10n': fs.readFileSync('./icons/rain.png'),
  '11d': fs.readFileSync('./icons/thunder.png'),
  '11n': fs.readFileSync('./icons/thunder.png'),
  '13d': fs.readFileSync('./icons/snow.png'),
  '13n': fs.readFileSync('./icons/snow.png'),
  '50d': fs.readFileSync('./icons/mist.png'),
  '50n': fs.readFileSync('./icons/mist.png'),
}
