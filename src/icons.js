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

export const iconMap = {
  '01d': {
    big: (await Jimp.read(sun)).resize(300, 300),
    small: (await Jimp.read(sun)).resize(120, 120),
  },
  '01n': {
    big: (await Jimp.read(sun)).resize(300, 300),
    small: (await Jimp.read(sun)).resize(120, 120),
  },
  '02d': {
    big: (await Jimp.read(cloudyDay)).resize(300, 300),
    small: (await Jimp.read(cloudyDay)).resize(120, 120),
  },
  '02n': {
    big: (await Jimp.read(cloudyNight)).resize(300, 300),
    small: (await Jimp.read(cloudyNight)).resize(120, 120),
  },
  '03d': {
    big: (await Jimp.read(cloud)).resize(300, 300),
    small: (await Jimp.read(cloud)).resize(120, 120),
  },
  '03n': {
    big: (await Jimp.read(cloud)).resize(300, 300),
    small: (await Jimp.read(cloud)).resize(120, 120),
  },
  '04d': {
    big: (await Jimp.read(clouds)).resize(300, 300),
    small: (await Jimp.read(clouds)).resize(120, 120),
  },
  '04n': {
    big: (await Jimp.read(clouds)).resize(300, 300),
    small: (await Jimp.read(clouds)).resize(120, 120),
  },
  '09d': {
    big: (await Jimp.read(rain)).resize(300, 300),
    small: (await Jimp.read(rain)).resize(120, 120),
  },
  '09n': {
    big: (await Jimp.read(rain)).resize(300, 300),
    small: (await Jimp.read(rain)).resize(120, 120),
  },
  '10d': {
    big: (await Jimp.read(rain)).resize(300, 300),
    small: (await Jimp.read(rain)).resize(120, 120),
  },
  '10n': {
    big: (await Jimp.read(rain)).resize(300, 300),
    small: (await Jimp.read(rain)).resize(120, 120),
  },
  '11d': {
    big: (await Jimp.read(thunder)).resize(300, 300),
    small: (await Jimp.read(thunder)).resize(120, 120),
  },
  '11n': {
    big: (await Jimp.read(thunder)).resize(300, 300),
    small: (await Jimp.read(thunder)).resize(120, 120),
  },
  '13d': {
    big: (await Jimp.read(snow)).resize(300, 300),
    small: (await Jimp.read(snow)).resize(120, 120),
  },
  '13n': {
    big: (await Jimp.read(snow)).resize(300, 300),
    small: (await Jimp.read(snow)).resize(120, 120),
  },
  '50d': {
    big: (await Jimp.read(mist)).resize(300, 300),
    small: (await Jimp.read(mist)).resize(120, 120),
  },
  '50n': {
    big: (await Jimp.read(mist)).resize(300, 300),
    small: (await Jimp.read(mist)).resize(120, 120),
  },
}
