const bootupScreen = document.getElementById("bootup-screen");
const loginScreen = document.getElementById("login-screen");
const transitionScreen = document.getElementById("transition-screen");
const mainUI = document.getElementById("main-ui");

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const commandInput = document.getElementById("command-input");
const output = document.getElementById("output");

const bootupSound = document.getElementById("bootup-sound");
const loginSuccess = document.getElementById("login-success");

const bootLines = [
  "> SYSTEM CHECK: OK",
  "> LOADING MODULES...",
  "> AUTH HANDSHAKE ESTABLISHED",
  "> INITIALIZING PROTOCOLS",
  "> ENCRYPTION STABLE",
  "> CONNECTION SECURE",
  "> BOOT COMPLETE"
];

function typeLine(line, element, delay) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      element.innerHTML += line[i];
      i++;
      if (i >= line.length) {
        clearInterval(interval);
        element.innerHTML += "<br/>";
        setTimeout(resolve, delay);
      }
    }, 50);
  });
}

async function runBootSequence() {
  const bootText = document.getElementById("boot-text");
  for (const line of bootLines) {
    await typeLine(line, bootText, 2000);
  }
  bootupScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
  runBootSequence().catch(err => console.error("Boot failed:", err));
});

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const user = usernameInput.value.trim().toLowerCase();
  const pass = passwordInput.value.trim().toLowerCase();

  if (user === "admin" && pass === "delta") {
    loginSuccess.play();
    loginScreen.classList.add("hidden");
    transitionScreen.classList.remove("hidden");

    setTimeout(() => {
      transitionScreen.classList.add("hidden");
      mainUI.classList.remove("hidden");
      bootupSound.play();
    }, 8000);
  } else {
    alert("ACCESS DENIED");
  }
});

commandInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    const command = commandInput.value.trim();
    output.innerHTML += `> ${command}<br/>`;
    commandInput.value = "";
  }
});
