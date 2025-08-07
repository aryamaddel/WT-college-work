const APIs = {
  facts: "https://uselessfacts.jsph.pl/random.json?language=en",
  quotes: "https://zenquotes.io/api/random",
  weather: "https://api.openweathermap.org/data/2.5/weather",
  jokes: "https://official-joke-api.appspot.com/random_joke",
  cats: "https://api.thecatapi.com/v1/images/search",
  activities: "https://www.boredapi.com/api/activity",
};

document.addEventListener("DOMContentLoaded", function () {
  loadAllContent();
});

function loadAllContent() {
  loadRandomFact();
  loadInspirationalQuote();
  loadWeather();
  loadRandomJoke();
  loadRandomCat();
  loadRandomActivity();
}

async function loadRandomFact() {
  const factContent = document.getElementById("factContent");
  factContent.innerHTML =
    '<div class="spinner-border text-muted" role="status" style="width: 2rem; height: 2rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.facts);
    const data = await response.json();

    factContent.innerHTML = `
            <div class="text-start">
                <p class="mb-0">${data.text}</p>
            </div>
        `;
  } catch (error) {
    factContent.innerHTML = `
            <div class="text-start">
                <p class="mb-0 text-muted">Honey never spoils! Archaeologists have found edible honey in ancient Egyptian tombs.</p>
            </div>
        `;
  }
}

async function loadInspirationalQuote() {
  const quoteContent = document.getElementById("quoteContent");
  quoteContent.innerHTML =
    '<div class="spinner-border text-muted" role="status" style="width: 2rem; height: 2rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.quotes);
    const data = await response.json();

    quoteContent.innerHTML = `
            <blockquote class="blockquote text-start">
                <p class="mb-2">"${data[0].q}"</p>
                <footer class="blockquote-footer">
                    <cite title="Source Title">${data[0].a}</cite>
                </footer>
            </blockquote>
        `;
  } catch (error) {
    quoteContent.innerHTML = `
            <blockquote class="blockquote text-start">
                <p class="mb-2">"The only way to do great work is to love what you do."</p>
                <footer class="blockquote-footer">
                    <cite title="Source Title">Steve Jobs</cite>
                </footer>
            </blockquote>
        `;
  }
}

async function loadWeather() {
  const weatherContent = document.getElementById("weatherContent");
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value || "London";

  weatherContent.innerHTML =
    '<div class="spinner-border text-muted" role="status" style="width: 2rem; height: 2rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();

    const current = data.current_condition[0];
    const weather = data.weather[0];

    weatherContent.innerHTML = `
            <div class="text-start">
                <div class="mb-3">
                    <h5 class="mb-1">${city}</h5>
                    <div class="h4">${current.temp_C}°C</div>
                    <p class="text-muted mb-0">${current.weatherDesc[0].value}</p>
                </div>
                <div class="small text-muted">
                    <div>Humidity: ${current.humidity}%</div>
                    <div>Wind: ${current.windspeedKmph} km/h</div>
                    <div>Feels like: ${current.FeelsLikeC}°C</div>
                </div>
            </div>
        `;
  } catch (error) {
    weatherContent.innerHTML = `
            <div class="text-start">
                <div class="mb-3">
                    <h5 class="mb-1">Demo Weather</h5>
                    <div class="h4">22°C</div>
                    <p class="text-muted mb-0">Partly Cloudy</p>
                </div>
                <div class="small text-muted">
                    Weather service temporarily unavailable
                </div>
            </div>
        `;
  }
}

async function loadRandomJoke() {
  const jokeContent = document.getElementById("jokeContent");
  jokeContent.innerHTML =
    '<div class="spinner-border text-muted" role="status" style="width: 2rem; height: 2rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.jokes);
    const data = await response.json();

    jokeContent.innerHTML = `
            <div class="text-start">
                <p class="mb-2">${data.setup}</p>
                <p class="mb-0 text-muted">${data.punchline}</p>
            </div>
        `;
  } catch (error) {
    jokeContent.innerHTML = `
            <div class="text-start">
                <p class="mb-2">Why don't scientists trust atoms?</p>
                <p class="mb-0 text-muted">Because they make up everything!</p>
            </div>
        `;
  }
}

async function loadRandomCat() {
  const catContent = document.getElementById("catContent");
  catContent.innerHTML =
    '<div class="spinner-border text-muted" role="status" style="width: 2rem; height: 2rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.cats);
    const data = await response.json();

    catContent.innerHTML = `
            <img src="${data[0].url}" class="img-fluid rounded" style="max-height: 200px; object-fit: cover;" alt="Random Cat">
        `;
  } catch (error) {
    catContent.innerHTML = `
            <div class="text-center text-muted">
                <div style="font-size: 3rem;">🐱</div>
                <small>Cat image unavailable</small>
            </div>
        `;
  }
}

async function loadRandomActivity() {
  const activityContent = document.getElementById("activityContent");
  activityContent.innerHTML =
    '<div class="spinner-border text-muted" role="status" style="width: 2rem; height: 2rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.activities);
    const data = await response.json();

    activityContent.innerHTML = `
            <div class="text-start">
                <p class="mb-2">${data.activity}</p>
                <div class="small text-muted">
                    <span>Participants: ${data.participants}</span> • 
                    <span>Type: ${data.type}</span>
                    ${
                      data.price > 0
                        ? ` • Cost: ${getPriceLevel(data.price)}`
                        : ""
                    }
                </div>
            </div>
        `;
  } catch (error) {
    activityContent.innerHTML = `
            <div class="text-start">
                <p class="mb-2">Learn something new today! Pick up a book or try a new recipe.</p>
                <div class="small text-muted">
                    <span>Participants: 1</span> • 
                    <span>Type: education</span>
                </div>
            </div>
        `;
  }
}

function getPriceLevel(price) {
  if (price === 0) return "Free";
  if (price <= 0.3) return "Low cost";
  if (price <= 0.6) return "Moderate cost";
  return "Higher cost";
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

setInterval(loadAllContent, 300000);
