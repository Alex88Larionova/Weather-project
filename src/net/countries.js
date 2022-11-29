export async function getCountries() {
  const BASE_URL = "https://countriesnow.space/api/v0.1/countries";
  const response = await fetch(BASE_URL);
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
  throw new Error(response.status);
}
