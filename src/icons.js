import fs from 'fs'
import Jimp from 'jimp'

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

export const iconMap = {
  '01d': {
    big: (await Jimp.read(sun)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(sun)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '01n': {
    big: (await Jimp.read(sun)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(sun)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '02d': {
    big: (await Jimp.read(cloudyDay)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(cloudyDay)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '02n': {
    big: (await Jimp.read(cloudyNight)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(cloudyNight)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '03d': {
    big: (await Jimp.read(cloud)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(cloud)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '03n': {
    big: (await Jimp.read(cloud)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(cloud)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '04d': {
    big: (await Jimp.read(clouds)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(clouds)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '04n': {
    big: (await Jimp.read(clouds)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(clouds)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '09d': {
    big: (await Jimp.read(rain)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(rain)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '09n': {
    big: (await Jimp.read(rain)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(rain)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '10d': {
    big: (await Jimp.read(rain)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(rain)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '10n': {
    big: (await Jimp.read(rain)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(rain)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '11d': {
    big: (await Jimp.read(thunder)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(thunder)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '11n': {
    big: (await Jimp.read(thunder)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(thunder)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '13d': {
    big: (await Jimp.read(snow)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(snow)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '13n': {
    big: (await Jimp.read(snow)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(snow)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '50d': {
    big: (await Jimp.read(mist)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(mist)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
  '50n': {
    big: (await Jimp.read(mist)).resize(
      currentWeatherIconSize,
      currentWeatherIconSize
    ),
    small: (await Jimp.read(mist)).resize(
      hourlyWeatherIconSize,
      hourlyWeatherIconSize
    ),
  },
}
