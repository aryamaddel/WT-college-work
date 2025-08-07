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
    '<div class="spinner-border text-info" role="status" style="width: 4rem; height: 4rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.facts);
    const data = await response.json();

    factContent.innerHTML = `
            <div class="alert alert-info border-0 fs-4" role="alert">
                <h5 class="alert-heading fs-3">Did you know?</h5>
                <p class="mb-0 fs-5">${data.text}</p>
            </div>
        `;
  } catch (error) {
    factContent.innerHTML = `
            <div class="alert alert-warning fs-4" role="alert">
                <i class="bi bi-exclamation-triangle"></i> Here's a backup fact: 
                Honey never spoils! Archaeologists have found edible honey in ancient Egyptian tombs.
            </div>
        `;
  }
}

async function loadInspirationalQuote() {
  const quoteContent = document.getElementById("quoteContent");
  quoteContent.innerHTML =
    '<div class="spinner-border text-success" role="status" style="width: 4rem; height: 4rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.quotes);
    const data = await response.json();

    quoteContent.innerHTML = `
            <blockquote class="blockquote text-center">
                <p class="mb-3 fs-4">"${data[0].q}"</p>
                <footer class="blockquote-footer fs-5">
                    <cite title="Source Title">${data[0].a}</cite>
                </footer>
            </blockquote>
        `;
  } catch (error) {
    quoteContent.innerHTML = `
            <blockquote class="blockquote text-center">
                <p class="mb-3 fs-4">"The only way to do great work is to love what you do."</p>
                <footer class="blockquote-footer fs-5">
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
    '<div class="spinner-border text-warning" role="status" style="width: 4rem; height: 4rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();

    const current = data.current_condition[0];
    const weather = data.weather[0];

    weatherContent.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="text-center">
                        <h4 class="fs-2">${city}</h4>
                        <div class="display-4 fw-bold">${current.temp_C}°C</div>
                        <p class="text-muted fs-5">${current.weatherDesc[0].value}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <ul class="list-unstyled fs-5">
                        <li class="mb-2"><i class="bi bi-eye text-info"></i> Visibility: ${current.visibility} km</li>
                        <li class="mb-2"><i class="bi bi-droplet text-primary"></i> Humidity: ${current.humidity}%</li>
                        <li class="mb-2"><i class="bi bi-wind text-success"></i> Wind: ${current.windspeedKmph} km/h</li>
                        <li class="mb-2"><i class="bi bi-thermometer text-danger"></i> Feels like: ${current.FeelsLikeC}°C</li>
                    </ul>
                </div>
            </div>
        `;
  } catch (error) {
    weatherContent.innerHTML = `
            <div class="alert alert-warning fs-4" role="alert">
                <i class="bi bi-exclamation-triangle"></i> Weather service temporarily unavailable. 
                <br><small>Try again later or check your internet connection.</small>
            </div>
            <div class="text-center">
                <h4 class="fs-2">Demo Weather</h4>
                <div class="display-4 fw-bold">22°C</div>
                <p class="text-muted fs-5">Partly Cloudy</p>
            </div>
        `;
  }
}

async function loadRandomJoke() {
  const jokeContent = document.getElementById("jokeContent");
  jokeContent.innerHTML =
    '<div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.jokes);
    const data = await response.json();

    jokeContent.innerHTML = `
            <div class="card border-primary">
                <div class="card-body">
                    <h6 class="card-title fs-5">${data.setup}</h6>
                    <p class="card-text text-primary fw-bold fs-5">${data.punchline}</p>
                </div>
            </div>
        `;
  } catch (error) {
    jokeContent.innerHTML = `
            <div class="card border-primary">
                <div class="card-body">
                    <h6 class="card-title fs-5">Why don't scientists trust atoms?</h6>
                    <p class="card-text text-primary fw-bold fs-5">Because they make up everything!</p>
                </div>
            </div>
        `;
  }
}

async function loadRandomCat() {
  const catContent = document.getElementById("catContent");
  catContent.innerHTML =
    '<div class="spinner-border text-secondary" role="status" style="width: 4rem; height: 4rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.cats);
    const data = await response.json();

    catContent.innerHTML = `
            <img src="${data[0].url}" class="img-fluid rounded shadow" style="max-height: 300px; object-fit: cover;" alt="Random Cat">
            <p class="mt-3 text-muted fs-5">Here's your dose of cuteness! 🐱</p>
        `;
  } catch (error) {
    catContent.innerHTML = `
            <div class="alert alert-info fs-4" role="alert">
                <h1 style="font-size: 4rem;">🐱</h1>
                <p>Imagine a cute cat here!</p>
                <small>Cat API is taking a nap, try again later.</small>
            </div>
        `;
  }
}

async function loadRandomActivity() {
  const activityContent = document.getElementById("activityContent");
  activityContent.innerHTML =
    '<div class="spinner-border text-danger" role="status" style="width: 4rem; height: 4rem;"><span class="visually-hidden">Loading...</span></div>';

  try {
    const response = await fetch(APIs.activities);
    const data = await response.json();

    activityContent.innerHTML = `
            <div class="card border-danger">
                <div class="card-body">
                    <h5 class="card-title fs-3">
                        <i class="bi bi-lightbulb text-warning"></i> Try This Activity!
                    </h5>
                    <p class="card-text fs-4">${data.activity}</p>
                    <div class="row mt-4">
                        <div class="col-6">
                            <small class="text-muted fs-5">
                                <i class="bi bi-people text-info"></i> Participants: ${
                                  data.participants
                                }
                            </small>
                        </div>
                        <div class="col-6">
                            <small class="text-muted fs-5">
                                <i class="bi bi-tag text-success"></i> Type: ${
                                  data.type
                                }
                            </small>
                        </div>
                    </div>
                    ${
                      data.price > 0
                        ? `
                        <div class="mt-3">
                            <small class="text-muted fs-5">
                                <i class="bi bi-currency-dollar text-warning"></i> Cost Level: ${getPriceLevel(
                                  data.price
                                )}
                            </small>
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
  } catch (error) {
    activityContent.innerHTML = `
            <div class="card border-danger">
                <div class="card-body">
                    <h5 class="card-title fs-3">
                        <i class="bi bi-lightbulb text-warning"></i> Try This Activity!
                    </h5>
                    <p class="card-text fs-4">Learn something new today! Pick up a book or try a new recipe.</p>
                    <small class="text-muted fs-5">
                        <i class="bi bi-people text-info"></i> Participants: 1 | 
                        <i class="bi bi-tag text-success"></i> Type: education
                    </small>
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
