const words = ["marialyz", "yasmin", "odilon", "lucas", "myrian", "thiago", "enzo", "dalva", "renan", "rayane", "davi", "francisco", "rebeca", "ronilson", "elefante", "cobra", "veado", "abelha", "antoniomax", "cleide", "cachorro", "deus", "canguru", "avestrus", "camaleao", "onca", "tucano", "girafa", "coelho", "tamandua", "cascavel", "zebra"]; // Lista de palavras para o jogo
let selectedWord = ""; // Palavra selecionada
let guessedWord = []; // Array de letras adivinhadas
let incorrectLetters = []; // Letras incorretas
let hangmanImageIndex = 0; // Índice para exibir as imagens da forca
const maxAttempts = 7; // Número máximo de tentativas

const wordDisplay = document.getElementById('word-display');
const incorrectLettersDisplay = document.getElementById('incorrect-letters');
const hangmanImageDisplay = document.getElementById('hangman-image');
const guessInput = document.getElementById('guess-input');

// Escolher uma palavra aleatória
function chooseRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    wordDisplay.textContent = guessedWord.join(' ');
}

// Atualizar a tela
function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
    incorrectLettersDisplay.textContent = incorrectLetters.join(', ');
    hangmanImageDisplay.style.backgroundImage = `url('hangman-${hangmanImageIndex}.png')`;
}

// Verificar se a letra está na palavra
function makeGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (guess.length !== 1 || !guess.match(/[a-z]/i)) {
        alert('Por favor, insira uma única letra válida.');
        return;
    }

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                guessedWord[i] = guess;
            }
        }
        if (guessedWord.join('') === selectedWord) {
            alert('Parabéns! Você venceu!');
            restartGame();
        }
    } else {
        incorrectLetters.push(guess);
        hangmanImageIndex++;
        if (hangmanImageIndex === maxAttempts) {
            alert('Você perdeu! A palavra era: ' + selectedWord);
            restartGame();
        }
    }

    updateDisplay();
}

// Reiniciar o jogo
function restartGame() {
    hangmanImageIndex = 0;
    incorrectLetters = [];
    chooseRandomWord();
    updateDisplay();
}

// Iniciar o jogo
chooseRandomWord();
updateDisplay();
