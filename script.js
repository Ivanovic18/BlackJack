let playerCards = [];
let dealerCards = [];
let sum = 0;
let playerFinalSum;
let dealerFinalSum;
let hasBlackJack = false;
let isAlive = false;
let playerSumEl = document.getElementById("sum-el");
let playerCardsEl = document.getElementById("cards-el");
let dealerSumEl = document.getElementById("dealer-sum-el");
let dealerCardsEl = document.getElementById("dealer-cards-el");

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
    $(".player-buttons").css("display", "inline");
    document.getElementById("game").style.display = "flex";
    document.getElementById("play-game").style.display = "none";
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    playerCards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame(playerCardsEl, playerSumEl, playerCards);
}

function renderGame(cardsEl, sumEl, cards) {
    cardsEl.textContent = "CARDS: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Sum: " + sum;

    if (cards === playerCards) {
        if (sum === 21) {
            BlackJack();
            hasBlackJack = true;
        } else if (sum > 21) {
            gameover();
            isAlive = false;
        }
    }
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        playerCards.push(card);
        renderGame(playerCardsEl, playerSumEl, playerCards);
    }
}

function stand() {
    $(".player-buttons").css("display", "none");
    playerFinalSum = sum;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    dealerCards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame(dealerCardsEl, dealerSumEl, dealerCards);
    dealerPlay();
    dealerFinalSum = sum;
    check();
}

function check() {
    if (dealerFinalSum <= 21) {
        let playerScore = 21 - playerFinalSum;
        let dealerScore = 21 - dealerFinalSum;
        if (playerScore < dealerScore) {
            BlackJack();
        } else if (playerScore > dealerScore) {
            gameover();
        } else {
            draw();
        }
    } else if (dealerFinalSum > 21) {
        BlackJack();
    }
}

function dealerAddCard() {
    let card = getRandomCard();
    sum += card;
    dealerCards.push(card);
    renderGame(dealerCardsEl, dealerSumEl, dealerCards);
}

function dealerPlay() {
    while (sum < playerFinalSum) {
        dealerAddCard();
    }
}

function BlackJack() {
    $(".end-game").css("display", "block");
    $("h1.end-game").text("You Won! Congratulations!");
    $(".player-buttons").css("display", "none");
}

function gameover() {
    $(".end-game").css("display", "block");
    $("h1.end-game").text("You Lost! Better Luck Next Time!");
    $(".player-buttons").css("display", "none");
}

function draw() {
    $(".end-game").css("display", "block");
    $("h1.end-game").text("It's Draw!");
    $(".player-buttons").css("display", "none");
}

function restart() {
    playerCards = [];
    dealerCards = [];
    dealerCardsEl.textContent = "CARDS: ";
    dealerSumEl.textContent = "SUM: ";
    sum = 0;
    $(".end-game").css("display", "none");
    hasBlackJack = false;
    startGame();
}
