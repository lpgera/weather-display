const searchParams = {
  lat: process.env.WEATHER_LATITUDE,
  lon: process.env.WEATHER_LONGITUDE,
  appid: process.env.WEATHER_APPID,
  units: process.env.WEATHER_UNITS || 'metric',
}

export async function getData() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?${new URLSearchParams(
      searchParams
    )}`
  )

  if (!response.ok) {
    console.error(
      'Could not get weather information from OpenWeatherMap API:',
      await response.text()
    )
    return null
  }

  return response.json()
}
