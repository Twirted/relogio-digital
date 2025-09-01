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

setInterval(updateClock, 1000);
updateClock(); // atualizar ao carregar

const neonColorInput = document.getElementById("neon-color");
const neonBtn = document.getElementById("neon-btn");
const neonPreview = document.getElementById("neon-preview");

// Atualiza a cor do preview e do neon
function setNeonColor(color) {
  document.documentElement.style.setProperty("--neon-color", color);
  neonPreview.style.background = color;
}

// Ao clicar no botão, abre o seletor nativo
neonBtn.addEventListener("click", () => {
  neonColorInput.click();
});

// Atualiza cor ao escolher
neonColorInput.addEventListener("input", (e) => {
  setNeonColor(e.target.value);
});

// Mantém cor ao recarregar
if (localStorage.getItem("neonColor")) {
  setNeonColor(localStorage.getItem("neonColor"));
  neonColorInput.value = localStorage.getItem("neonColor");
} else {
  setNeonColor(neonColorInput.value);
}

neonColorInput.addEventListener("change", (e) => {
  localStorage.setItem("neonColor", e.target.value);
  setNeonColor(e.target.value);
});