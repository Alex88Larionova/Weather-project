export async function getWeatherData(params) {

  const { apiKey, apiBase, apiLat, apiLon, unit, type, city, countryCode } = params
  if(type==='city') {
    const response = await fetch(
      `${apiBase}?q=${city},${countryCode}&appid=${apiKey}&units=${unit}`
    )
    if (response.status === 200) {
      const json = await response.json()
      return json
    }
    throw new Error(response.status)

  }else if(type==='coord') {
    const response = await fetch(
      `${apiBase}?lat=${apiLat}&lon=${apiLon}&appid=${apiKey}&units=${unit}`
    )
    if (response.status === 200) {
      const json = await response.json()
      return json
    }
    throw new Error(response.status)

  }

}
