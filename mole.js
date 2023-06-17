let score = 0;
let molesLeft = 30;
let popupLength = 3000;
let hideTimeout;
let clickable = false;

function startGame() {
  score = 0;
  molesLeft = 30;
  popupLength = 3000;
  clickable = false;
  document.getElementById("startButton").disabled = true;
  document.getElementById("resetButton").disabled = false;
  document.querySelector(".sb__score").innerHTML = score;
  document.querySelector(".sb__moles").innerHTML = molesLeft;
  document
    .querySelector(".sb__game-over")
    .classList.add("sb__game-over--hidden");
}

function resetGame() {
  clearTimeout(hideTimeout);
  const moleHeads = document.querySelectorAll(".gcMole");
  for (let moleHead of moleHeads) {
    moleHead.classList.add("mole--hidden");
  }
  document.getElementById("startButton").disabled = false;
  document.getElementById("resetButton").disabled = true;
  document
    .querySelector(".sb__game-over")
    .classList.add("sb__game-over--hidden");
}

function popUpRandomMole() {
  if (molesLeft <= 0) {
    document
      .querySelector(".sb__game-over")
      .classList.remove("sb__game-over--hidden");
    return;
  }

  const moleHeads = document.querySelectorAll(".mole--hidden");

  if (moleHeads.length === 0) {
    return;
  }
  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  clickable = true;

  moleHead.classList.remove("mole--hidden", "gcMole--clicked");

  molesLeft -= 1;
  document.querySelector(".sb__moles").innerHTML = molesLeft;

  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}

function hideMole(mole) {
  clickable = true; // Set clickable to true before showing the next mole
  mole.classList.add("mole--hidden");

  setTimeout(popUpRandomMole, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startButton").addEventListener("click", () => {
    startGame();
    popUpRandomMole();
  });

  document.getElementById("resetButton").addEventListener("click", resetGame);

  const moleHeads = document.querySelectorAll(".gcMole");
  for (let moleHead of moleHeads) {
    moleHead.addEventListener("click", (event) => {
      if (!clickable) return;
      event.target.src = "hit-mole-head.gif";

      // Add mole--clicked class and remove it after 0.25 seconds
      event.target.classList.add("mole--clicked");

      setTimeout(() => {
        // Pause on the clicked image for 1 second
        setTimeout(() => {
          event.target.classList.remove("mole--clicked");

          // Reset mole image back to the original image
          event.target.src = "mole-head.gif";
        }, 500);
      }, 250);

      score += 1;
      document.querySelector(".sb__score").innerHTML = score;
      popupLength -= popupLength / 20;

      clearTimeout(hideTimeout);
      hideMole(event.target);
    });
  }

  document.body.addEventListener("mousedown", () => {
    document.body.classList.add("clicked");
  });

  document.body.addEventListener("mouseup", () => {
    document.body.classList.remove("clicked");
  });
});
