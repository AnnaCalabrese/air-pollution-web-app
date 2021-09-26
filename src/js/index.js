// SELECTING ELEMENTS
const city = document.getElementById("city");
const btn = document.getElementById("btn");
const displayCityName = document.getElementById("display-name");
const pStats = document.getElementById("display-stats");
const pTime = document.getElementById("display-time");
const geoBtn = document.getElementById("geoBtn");
const API_KEY = process.env.API_KEY;
// SEARCHING & GETTING DATA FROM API
async function getCityPollution() {
  const cityValue = city.value;
  let url = `https://api.waqi.info/feed/${cityValue}/?token=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  displayCityName.innerHTML = data.data.city.name;
  pStats.innerHTML = data.data.aqi;
  pTime.innerHTML = data.data.time.s;
}

btn.addEventListener("click", getCityPollution);

// IMPLEMENTING GEOLOCATION
function geolocation() {
  if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const geoApiUrl = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`;

      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          city.value = data.data.city.name;
          getCityPollution();
        })
        .catch((err) => {
          alert("Oops! Something went wrong. Try again.");
        });
    });
  } else {
    alert("Ooops! Something went wrong. Geolocation might not be available");
  }
}
geoBtn.addEventListener("click", geolocation);
