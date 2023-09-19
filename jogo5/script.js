const cards = document.querySelectorAll(".memory-card");
const message = document.querySelector(".message");
const restartButton = document.getElementById("restart-button");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedCards += 2;
    if (matchedCards === cards.length) {
        message.style.display = "block";
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener("click", flipCard));

function restartGame() {
    cards.forEach(card => {
        card.classList.remove("flipped");
        card.addEventListener("click", flipCard);
    });

    shuffleCards(); // Se você tiver uma função para embaralhar as cartas
    matchedCards = 0;
    message.style.display = "none";
    resetBoard();
}

restartButton.addEventListener("click", restartGame); // Adicionando um ouvinte de evento ao botão de reiniciar

cards.forEach(card => card.addEventListener("click", flipCard));