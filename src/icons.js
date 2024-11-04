import fs from 'fs'
import { Jimp } from 'jimp'

const sun = fs.readFileSync('./icons/sun.png')
const cloudyDay = fs.readFileSync('./icons/cloudy-day.png')
const cloudyNight = fs.readFileSync('./icons/cloudy-night.png')
const cloud = fs.readFileSync('./icons/cloud.png')
const clouds = fs.readFileSync('./icons/clouds.png')
const rain = fs.readFileSync('./icons/rain.png')
const thunder = fs.readFileSync('./icons/thunder.png')
const snow = fs.readFileSync('./icons/snow.png')
const mist = fs.readFileSync('./icons/mist.png')

export const currentWeatherIconSize = 300
export const hourlyWeatherIconSize = 120

const bigIconResizeOptions = {
  w: currentWeatherIconSize,
  h: currentWeatherIconSize,
}

const smallIconResizeOptions = {
  w: hourlyWeatherIconSize,
  h: hourlyWeatherIconSize,
}

export const iconMap = {
  '01d': {
    big: (await Jimp.read(sun)).resize(bigIconResizeOptions),
    small: (await Jimp.read(sun)).resize(smallIconResizeOptions),
  },
  '01n': {
    big: (await Jimp.read(sun)).resize(bigIconResizeOptions),
    small: (await Jimp.read(sun)).resize(smallIconResizeOptions),
  },
  '02d': {
    big: (await Jimp.read(cloudyDay)).resize(bigIconResizeOptions),
    small: (await Jimp.read(cloudyDay)).resize(smallIconResizeOptions),
  },
  '02n': {
    big: (await Jimp.read(cloudyNight)).resize(bigIconResizeOptions),
    small: (await Jimp.read(cloudyNight)).resize(smallIconResizeOptions),
  },
  '03d': {
    big: (await Jimp.read(cloud)).resize(bigIconResizeOptions),
    small: (await Jimp.read(cloud)).resize(smallIconResizeOptions),
  },
  '03n': {
    big: (await Jimp.read(cloud)).resize(bigIconResizeOptions),
    small: (await Jimp.read(cloud)).resize(smallIconResizeOptions),
  },
  '04d': {
    big: (await Jimp.read(clouds)).resize(bigIconResizeOptions),
    small: (await Jimp.read(clouds)).resize(smallIconResizeOptions),
  },
  '04n': {
    big: (await Jimp.read(clouds)).resize(bigIconResizeOptions),
    small: (await Jimp.read(clouds)).resize(smallIconResizeOptions),
  },
  '09d': {
    big: (await Jimp.read(rain)).resize(bigIconResizeOptions),
    small: (await Jimp.read(rain)).resize(smallIconResizeOptions),
  },
  '09n': {
    big: (await Jimp.read(rain)).resize(bigIconResizeOptions),
    small: (await Jimp.read(rain)).resize(smallIconResizeOptions),
  },
  '10d': {
    big: (await Jimp.read(rain)).resize(bigIconResizeOptions),
    small: (await Jimp.read(rain)).resize(smallIconResizeOptions),
  },
  '10n': {
    big: (await Jimp.read(rain)).resize(bigIconResizeOptions),
    small: (await Jimp.read(rain)).resize(smallIconResizeOptions),
  },
  '11d': {
    big: (await Jimp.read(thunder)).resize(bigIconResizeOptions),
    small: (await Jimp.read(thunder)).resize(smallIconResizeOptions),
  },
  '11n': {
    big: (await Jimp.read(thunder)).resize(bigIconResizeOptions),
    small: (await Jimp.read(thunder)).resize(smallIconResizeOptions),
  },
  '13d': {
    big: (await Jimp.read(snow)).resize(bigIconResizeOptions),
    small: (await Jimp.read(snow)).resize(smallIconResizeOptions),
  },
  '13n': {
    big: (await Jimp.read(snow)).resize(bigIconResizeOptions),
    small: (await Jimp.read(snow)).resize(smallIconResizeOptions),
  },
  '50d': {
    big: (await Jimp.read(mist)).resize(bigIconResizeOptions),
    small: (await Jimp.read(mist)).resize(smallIconResizeOptions),
  },
  '50n': {
    big: (await Jimp.read(mist)).resize(bigIconResizeOptions),
    small: (await Jimp.read(mist)).resize(smallIconResizeOptions),
  },
}
