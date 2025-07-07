const container = document.getElementById('meduse-container');
const buttons = document.querySelectorAll('#controls button');
const storyText = document.getElementById('story-text');

const messages = {
  dort: ["Elle attend un câlin 💤", "Merci pour le câlin 🤍"],
  reveille: ["Elle ouvre un œil... 👀"],
  fume: ["Elle fume maintenant... Faut croire que ça détend un peu 🚬"]
};

let hugGiven = false;
let currentState = "dort";

function loadSVG() {
  container.innerHTML = `<object id="meduse-svg" type="image/svg+xml" data="svg/manu.svg"></object>`;
}

// Manipule les IDs internes après chargement complet
container.addEventListener('load', () => {
  updateState(currentState);
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    currentState = button.dataset.state;
    updateState(currentState);
  });
});

container.addEventListener('click', () => {
  if (currentState === "dort" && !hugGiven) {
    hugGiven = true;
    updateStory("dort");
  }
});

function updateState(state) {
  const svgDoc = container.querySelector('object').contentDocument;

  const yeuxFermes = svgDoc.getElementById('yeux-fermes');
  const yeuxOuverts = svgDoc.getElementById('yeux-ouverts');
  const cigarette = svgDoc.getElementById('cigarette');

  // Tout cacher par défaut
  yeuxFermes.style.display = 'none';
  yeuxOuverts.style.display = 'none';
  cigarette.style.display = 'none';

  if (state === "dort") {
    yeuxFermes.style.display = 'block';
  } else if (state === "reveille") {
    yeuxOuverts.style.display = 'block';
  } else if (state === "fume") {
    yeuxOuverts.style.display = 'block';
    cigarette.style.display = 'block';
  }

  updateStory(state);
}

function updateStory(state) {
  if (state === "dort") {
    storyText.textContent = hugGiven ? messages.dort[1] : messages.dort[0];
  } else {
    storyText.textContent = messages[state][0];
  }
}

// Charge master au début
loadSVG();
