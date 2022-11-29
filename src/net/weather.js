export async function getWeatherData(apiKey, apiBase, apiLat, apiLon, unit) {
  const response = await fetch(
    `${apiBase}?lat=${apiLat}&lon=${apiLon}&appid=${apiKey}&units=${unit}`
  );
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
  throw new Error(response.status);
}
