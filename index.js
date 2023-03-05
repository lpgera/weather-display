import 'dotenv/config'
import express from 'express'
import { getData } from './src/weather.js'
import { iconMap } from './src/icons.js'
import Jimp from 'jimp'

const app = express()
const port = process.env.PORT ?? 3000

app.get('/', async (req, res, next) => {
  try {
    const font128 = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
    const font64 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
    const font32 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
    const font16 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
    const font8 = await Jimp.loadFont(Jimp.FONT_SANS_8_BLACK)

    const image = new Jimp(540, 960, 0xffffffff)

    const weatherData = await getData()

    if (weatherData) {
      const topGutter = 30
      const sideGutter = 14
      const gutter = 15

      const currentWeatherIconSize = 300
      const currentWeatherIcon = await Jimp.read(
        `./icons/${iconMap[weatherData.current.weather[0].icon]}.png`
      )
      image.composite(
        currentWeatherIcon.resize(
          currentWeatherIconSize,
          currentWeatherIconSize
        ),
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
          text: `${weatherData.current.temp.toFixed(1)}°C`,
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
          text: `${(weatherData.current.wind_speed * 3.6).toFixed(1)} km/h`,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        512
      )

      const hourlyTop = currentWindTop + 64 + gutter * 2
      for (let i = 0; i < 4; i++) {
        const hourlyData = weatherData.hourly[i]

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
        const weatherIcon = await Jimp.read(
          `./icons/${iconMap[hourlyData.weather[0].icon]}.png`
        )
        image.composite(
          weatherIcon.resize(120, 120),
          sideGutter + i * 128 + 4,
          hourlyWeatherIconTop
        )

        image.print(
          font32,
          sideGutter + i * 128,
          hourlyWeatherIconTop + gutter + 128 + gutter / 2,
          {
            text: `${hourlyData.temp.toFixed(1)}°C`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          128
        )

        image.print(
          font32,
          sideGutter + i * 128,
          hourlyWeatherIconTop + gutter + 128 + gutter / 2 + 32 + gutter / 2,
          {
            text: `${hourlyData.pop * 100}%`,
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
            text: `${
              (hourlyData.snow?.['1h'] ?? 0) + (hourlyData.rain?.['1h'] ?? 0)
            } mm`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          128
        )
      }
    } else {
    }

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
