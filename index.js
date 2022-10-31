window.handlePanelClicked = handlePanelClicked;

const topLeft = document.querySelector(".top-left-panel");
const topRight = document.querySelector(".top-right-panel");
const bottomLeft = document.querySelector(".bottom-left-panel");
const bottomRight = document.querySelector(".bottom-right-panel");

const getRandomPanel = () => {
  const panels = [topLeft, topRight, bottomLeft, bottomRight];
  return panels[parseInt(Math.random() * panels.length)];
};

const count = document.getElementById("count");
let clickCount = 0;

count.innerText = clickCount;
const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = (panel) => {
  return new Promise((resolve, reject) => {
    panel.className += " active";
    setTimeout(() => {
      panel.className = panel.className.replace(" active", "");
      setTimeout(() => {
        resolve();
      }, 250);
    }, 500);
  });
};

let canClick = false;

function handlePanelClicked(panel) {
  if (!canClick) return;
  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panel) {
    if (sequenceToGuess.length === 0) {
      // start new round
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      startFlashing();
      clickCount++;
      count.innerText = clickCount;
    }
  } else {
    // end game
    count.innerText = clickCount;
    alert(`Helaas, je hebt een fout gemaakt. Noteer je score in het formulier en begin opnieuw door de pagina opnieuw te laden. Heel erg bedankt!`);
  }
}

const startFlashing = async () => {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel);
  }
  canClick = true;
};

startFlashing();
