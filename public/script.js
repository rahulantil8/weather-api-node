const resultDiv = document.getElementById("result");
const loader = document.getElementById("loader");

function showLoader() {
    loader.classList.remove("hidden");
    resultDiv.innerHTML = "";
}

function hideLoader() {
    loader.classList.add("hidden");
}

async function getCurrentWeather() {
    const city = cityInput.value.trim();
    if (!city) return alert("Enter city name");

    showLoader();

    try {
        const res = await fetch(`/weather?city=${city}`);
        const data = await res.json();

        if (!res.ok) {
            resultDiv.innerHTML = `<div class="card">${data.message}</div>`;
            return;
        }

        resultDiv.innerHTML = `
            <div class="card">
                <h3>${data.location.name}, ${data.location.country}</h3>
                <p>🌡️ ${data.current.temp_c} °C</p>
                <p>☁️ ${data.current.condition.text}</p>
            </div>
        `;
    } catch {
        resultDiv.innerHTML = `<div class="card">Something went wrong 😢</div>`;
    } finally {
        hideLoader();
    }
}

async function getForecast() {
    const city = cityInput.value.trim();
    if (!city) return alert("Enter city name");

    showLoader();

    try {
        const res = await fetch(`/weather/forecast?city=${city}&days=3`);
        const data = await res.json();

        if (!res.ok) {
            resultDiv.innerHTML = `<div class="card">${data.message}</div>`;
            return;
        }

        let html = `<div class="card"><h3>${data.location.name} Forecast</h3></div>`;

        data.forecast.forecastday.forEach(day => {
            html += `
                <div class="card">
                    <p>📅 ${day.date}</p>
                    <p>🌡️ ${day.day.avgtemp_c} °C</p>
                    <p>${day.day.condition.text}</p>
                </div>
            `;
        });

        resultDiv.innerHTML = html;
    } catch {
        resultDiv.innerHTML = `<div class="card">Failed to load forecast 😢</div>`;
    } finally {
        hideLoader();
    }
}
