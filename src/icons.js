import fs from 'fs'
import { PNG } from 'pngjs'

function readIconSync(path) {
  const file = fs.readFileSync(path)
  return PNG.sync.read(file)
}

const icons = {
  cloud: readIconSync('icons/cloud.png'),
  clouds: readIconSync('icons/clouds.png'),
  cloudyDay: readIconSync('icons/cloudy-day.png'),
  cloudyNight: readIconSync('icons/cloudy-night.png'),
  mist: readIconSync('icons/mist.png'),
  moon: readIconSync('icons/moon.png'),
  rain: readIconSync('icons/rain.png'),
  snow: readIconSync('icons/snow.png'),
  sun: readIconSync('icons/sun.png'),
  thunder: readIconSync('icons/thunder.png'),
}

export default icons
