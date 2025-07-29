function updateClock() {
  const clock = document.getElementById("clock");
  const dateElement = document.getElementById("date");
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 vira 12
  hours = String(hours).padStart(2, "0");

  clock.textContent = `${hours}:${minutes}:${seconds} ${period}`;

  const dia = String(now.getDate()).padStart(2, "0");
  const mes = String(now.getMonth() + 1).padStart(2, "0");
  const ano = now.getFullYear();

  dateElement.textContent = `${dia}/${mes}/${ano}`;

  // animação suave
  clock.classList.add("changed");
  setTimeout(() => clock.classList.remove("changed"), 150);
}

// Tema claro/escuro
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  const body = document.body;
  const isDark = body.classList.toggle("dark");
  body.classList.toggle("light", !isDark);
  toggleBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});

function applyAutoTheme() {
  const hour = new Date().getHours();
  const isDayTime = hour >= 6 && hour < 18;

  if (isDayTime) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    themeToggle.textContent = "🌙 Modo Escuro";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    themeToggle.textContent = "🌞 Modo Claro";
  }
}

async function getWeather() {
  if (!navigator.geolocation) {
    alert('Geolocalização não suportada pelo navegador.');
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = '840934404a321fd14ce84b2a52d85ddc'; // sua API key

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar clima');
      }

      const data = await response.json();
      const temp = Math.round(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.getElementById('weather').innerHTML = `
        <img src="${iconUrl}" alt="${description}" />
        <span>${temp}°C - ${data.name}</span>
      `;
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
      document.getElementById('weather').textContent = 'Erro no clima';
    }
  }, (error) => {
    console.error('Erro ao obter localização:', error);
    document.getElementById('weather').textContent = 'Não foi possível obter sua localização.';
  });
}

setInterval(updateClock, 1000);
updateClock(); // atualizar ao carregar
getWeather();
setInterval(getWeather, 600000);