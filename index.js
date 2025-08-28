import express from 'express'
import { getData } from './src/weather.js'
import { currentWeatherIconSize, iconMap } from './src/icons.js'
import { HorizontalAlign, Jimp, JimpMime, loadFont, PNGFilterType } from 'jimp'
import {
  SANS_128_BLACK,
  SANS_64_BLACK,
  SANS_32_BLACK,
  SANS_16_BLACK,
} from 'jimp/fonts'

const app = express()
const port = process.env.PORT ?? 3000

const font128 = await loadFont(SANS_128_BLACK)
const font64 = await loadFont(SANS_64_BLACK)
const font32 = await loadFont(SANS_32_BLACK)
const font16 = await loadFont(SANS_16_BLACK)

const roundToOneDecimal = (number) => Math.round(number * 10) / 10

app.get('/', async (req, res, next) => {
  try {
    const image = new Jimp({ width: 540, height: 960, color: 0xffffffff })

    const weatherData = await getData()

    const date = new Date(weatherData.current.dt * 1000)

    if (weatherData) {
      const topGutter = 30
      const sideGutter = 14
      const gutter = 15

      image.print({
        font: font16,
        x: 0,
        y: 0,
        text: {
          text: new Intl.DateTimeFormat('en-GB', {
            timeStyle: 'medium',
          }).format(date),
          alignmentX: HorizontalAlign.CENTER,
        },
        maxWidth: 540,
      })

      image.composite(
        iconMap[weatherData.current.weather[0].icon].big,
        120,
        topGutter,
      )

      const currentWeatherDescriptionTop =
        topGutter + currentWeatherIconSize + gutter
      image.print({
        font: font32,
        x: sideGutter,
        y: currentWeatherDescriptionTop,
        text: {
          text: weatherData.current.weather[0].description,
          alignmentX: HorizontalAlign.CENTER,
        },
        maxWidth: 512,
      })

      const currentTemperatureTop = currentWeatherDescriptionTop + 32 + gutter
      image.print({
        font: font128,
        x: sideGutter,
        y: currentTemperatureTop,
        text: {
          text: `${roundToOneDecimal(weatherData.current.temp)}°C`,
          alignmentX: HorizontalAlign.CENTER,
        },
        maxWidth: 512,
      })

      const currentWindTop = currentTemperatureTop + 128 + gutter
      image.print({
        font: font64,
        x: sideGutter,
        y: currentWindTop,
        text: {
          text: `${roundToOneDecimal(
            weatherData.current.wind_speed * 3.6,
          )} km/h`,
          alignmentX: HorizontalAlign.CENTER,
        },
        maxWidth: 512,
      })

      const hourlyTop = currentWindTop + 64 + gutter * 2
      for (let i = 0; i < 4; i++) {
        const hourlyData = weatherData.hourly[i + 1] // skip current hour

        const date = new Date(hourlyData.dt * 1000)
        image.print({
          font: font32,
          x: sideGutter + i * 128,
          y: hourlyTop,
          text: {
            text: `${date.getHours().toString().padStart(2, '0')}:${date
              .getMinutes()
              .toString()
              .padStart(2, '0')}`,
            alignmentX: HorizontalAlign.CENTER,
          },
          maxWidth: 128,
        })

        const hourlyWeatherIconTop = hourlyTop + 32 + gutter
        image.composite(
          iconMap[hourlyData.weather[0].icon].small,
          sideGutter + i * 128 + 4,
          hourlyWeatherIconTop,
        )

        image.print({
          font: font32,
          x: sideGutter + i * 128,
          y: hourlyWeatherIconTop + gutter + 128 + gutter / 2,
          text: {
            text: `${roundToOneDecimal(hourlyData.temp)}°C`,
            alignmentX: HorizontalAlign.CENTER,
          },
          maxWidth: 128,
        })

        image.print({
          font: font32,
          x: sideGutter + i * 128,
          y: hourlyWeatherIconTop + gutter + 128 + gutter / 2 + 32 + gutter / 2,
          text: {
            text: `${roundToOneDecimal(hourlyData.pop * 100)}%`,
            alignmentX: HorizontalAlign.CENTER,
          },
          maxWidth: 128,
        })

        image.print({
          font: font32,
          x: sideGutter + i * 128,
          y:
            hourlyWeatherIconTop +
            gutter +
            128 +
            gutter / 2 +
            32 +
            gutter / 2 +
            32 +
            gutter / 2,
          text: {
            text: `${roundToOneDecimal(
              (hourlyData.snow?.['1h'] ?? 0) + (hourlyData.rain?.['1h'] ?? 0),
            )} mm`,
            alignmentX: HorizontalAlign.CENTER,
          },
          maxWidth: 128,
        })
      }
    } else {
      image.print({
        font: font64,
        x: 0,
        y: 430,
        text: {
          text: `Network error`,
          alignmentX: HorizontalAlign.CENTER,
        },
        maxWidth: 540,
      })
    }

    const imageBuffer = await image.getBuffer(JimpMime.png, {
      deflateLevel: 9,
      strategy: 0,
      colorType: 0,
      filterType: PNGFilterType.NONE,
    })

    res.set('Content-Type', JimpMime.png)
    res.send(imageBuffer)
  } catch (error) {
    next(error)
  }
})

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

const exitHandler = async (signal) => {
  console.log(`Received ${signal}, exiting...`)
  server.close()
}
process.on('SIGINT', exitHandler)
process.on('SIGTERM', exitHandler)
