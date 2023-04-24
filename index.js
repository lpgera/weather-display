import 'dotenv/config'
import express from 'express'
import { getData } from './src/weather.js'
import { currentWeatherIconSize, iconMap } from './src/icons.js'
import Jimp from 'jimp'

const app = express()
const port = process.env.PORT ?? 3000

const font128 = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
const font64 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
const font32 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)

const roundToOneDecimal = (number) => Math.round(number * 10) / 10

app.get('/', async (req, res, next) => {
  try {
    const image = new Jimp(540, 960, 0xffffffff)

    const weatherData = await getData()

    if (weatherData) {
      const topGutter = 30
      const sideGutter = 14
      const gutter = 15

      image.composite(
        iconMap[weatherData.current.weather[0].icon].big,
        120,
        topGutter
      )

      const currentWeatherDescriptionTop =
        topGutter + currentWeatherIconSize + gutter
      image.print(
        font32,
        sideGutter,
        currentWeatherDescriptionTop,
        {
          text: weatherData.current.weather[0].description,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        512
      )

      const currentTemperatureTop = currentWeatherDescriptionTop + 32 + gutter
      image.print(
        font128,
        sideGutter,
        currentTemperatureTop,
        {
          text: `${roundToOneDecimal(weatherData.current.temp)}°C`,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        512
      )

      const currentWindTop = currentTemperatureTop + 128 + gutter
      image.print(
        font64,
        sideGutter,
        currentWindTop,
        {
          text: `${roundToOneDecimal(
            weatherData.current.wind_speed * 3.6
          )} km/h`,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        512
      )

      const hourlyTop = currentWindTop + 64 + gutter * 2
      for (let i = 0; i < 4; i++) {
        const hourlyData = weatherData.hourly[i + 1] // skip current hour

        const date = new Date(hourlyData.dt * 1000)
        image.print(
          font32,
          sideGutter + i * 128,
          hourlyTop,
          {
            text: `${date.getHours().toString().padStart(2, '0')}:${date
              .getMinutes()
              .toString()
              .padStart(2, '0')}`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          128
        )

        const hourlyWeatherIconTop = hourlyTop + 32 + gutter
        image.composite(
          iconMap[hourlyData.weather[0].icon].small,
          sideGutter + i * 128 + 4,
          hourlyWeatherIconTop
        )

        image.print(
          font32,
          sideGutter + i * 128,
          hourlyWeatherIconTop + gutter + 128 + gutter / 2,
          {
            text: `${roundToOneDecimal(hourlyData.temp)}°C`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          128
        )

        image.print(
          font32,
          sideGutter + i * 128,
          hourlyWeatherIconTop + gutter + 128 + gutter / 2 + 32 + gutter / 2,
          {
            text: `${roundToOneDecimal(hourlyData.pop * 100)}%`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          128
        )

        image.print(
          font32,
          sideGutter + i * 128,
          hourlyWeatherIconTop +
            gutter +
            128 +
            gutter / 2 +
            32 +
            gutter / 2 +
            32 +
            gutter / 2,
          {
            text: `${roundToOneDecimal(
              (hourlyData.snow?.['1h'] ?? 0) + (hourlyData.rain?.['1h'] ?? 0)
            )} mm`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          128
        )
      }
    } else {
      image.print(
        font64,
        0,
        430,
        {
          text: `Network error`,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        540
      )
    }

    image.deflateStrategy(0)
    image.filterType(Jimp.PNG_FILTER_UP)

    const imageBuffer = await image.getBufferAsync(Jimp.MIME_PNG)

    res.set('Content-Type', Jimp.MIME_PNG)
    res.send(imageBuffer)
  } catch (error) {
    next(error)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

process.on('SIGINT', () => {
  console.log('Server shutting down...')
  process.exit()
})
