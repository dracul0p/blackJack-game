let player = {
  name: "Per",
  chips: 200, // Start with a higher initial amount of chips
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

// Initialize player chips display
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  if (player.chips > 0) {
    // Only start if player has chips
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
  } else {
    messageEl.textContent = "You're out of chips! Game Over.";
  }
}

function renderGame() {
  // Display cards
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum: " + sum;

  // Check the game status
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack! You win 100 chips!";
    player.chips += 400;
    hasBlackJack = true;
  } else {
    message = "You're out of the game! You lost 50 chips.";
    player.chips -= 50;
    if (player.chips <= 0) {
      player.chips = 0;
      message += " You're out of chips!";
    }
    isAlive = false;
  }

  // Update game messages
  messageEl.textContent = message;
  playerEl.textContent = player.name + ": $" + player.chips;
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}
