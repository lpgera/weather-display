const got = require('got')
const icons = require('./icons')

const searchParams = {
  lat: process.env.WEATHER_LATTITUDE,
  lon: process.env.WEATHER_LONGITUDE,
  appid: process.env.WEATHER_APPID,
  units: process.env.WEATHER_UNITS || 'metric',
}

const iconMap = {
  '01d': icons.sun,
  '01n': icons.moon,
  '02d': icons.cloudyDay,
  '02n': icons.cloudyNight,
  '03d': icons.cloud,
  '03n': icons.cloud,
  '04d': icons.clouds,
  '04n': icons.clouds,
  '09d': icons.rain,
  '09n': icons.rain,
  '10d': icons.rain,
  '10n': icons.rain,
  '11d': icons.thunder,
  '11n': icons.thunder,
  '13d': icons.snow,
  '13n': icons.snow,
  '50d': icons.mist,
  '50n': icons.mist,
}

async function getData() {
  const response = await got('https://api.openweathermap.org/data/2.5/onecall', { searchParams }).json()

  if (!response) {
    console.error('Could not get weather information from OpenWeatherMap API')
    return null
  }

  const temperature = Math.round(response.current.temp)
  const [h1, h2, h3, h4] = response.hourly
  const probabilityOfPercipitation = Math.round(Math.max(h1.pop, h2.pop, h3.pop, h4.pop) * 100)
  const rawIcon = response.current.weather[0].icon
  const icon = iconMap[rawIcon]

  return {
    icon,
    temperature,
    probabilityOfPercipitation,
  }
}

module.exports = {
  getData,
}
