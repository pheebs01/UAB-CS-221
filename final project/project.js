const wordList = [
    {word: "guitar", hint: "A musical instrument with strings."},
    {word: "oxygen", hint: "A colorless, odorless gas essential for life."},
    {word: "mountain", hint: "A large natural elevation of the Earth's surface."},
    {word: "painting", hint: "An art form using colors on a surface to create images or expression."},
    ]

let currentWord = '';
let guessedLetters = [];
let hangmanFigureState = 0;
let guessCount = 0;
let timer = 0;
let timerInterval; // Variable to store the interval ID

// Function to start a new game
function startGame() {
    // Reset game state
    currentWord = getRandomWord();
    guessedLetters = [];
    hangmanFigureState = 0;
    guessCount = 0;
    timer = 0;

    // Display initial UI
    updateWordDisplay();
    updateHangmanFigure();
    updateGuessCount();
    updateTimer();
    generateLetterButtons();
    resetIncorrectLetters();
    displayMessage("reset");
    clearInterval(timerInterval);
    setTimer();
}

function setTimer() {
    // Start the timer interval
    timerInterval = setInterval(() => {
        timer++;
        updateTimer();
    }, 1000); // Increment timer every 1000 milliseconds (1 second)
}

// Function to end the game and stop the timer
function endGame() {
    clearInterval(timerInterval);

    // Disable all letter buttons
    const lettersElement = document.getElementById('letters');
    const buttons = lettersElement.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

// Function to get a random word from the word list
function getRandomWord() {
    // Return a random word from the word list
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex].word;
    console.log('Selected word:', randomWord);
    return randomWord;
}

let correctLetters = [];
let incorrectLetters = [];
let displayedWord = '';

// Function to update the displayed word with guessed letters
function updateWordDisplay() {
    const wordDisplayElement = document.getElementById('word-display');

    // Map each letter in the current word to either the letter, underscore, or space if not guessed
    displayedWord = currentWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : (letter === ' ' ? ' ' : '_')))
        .join(' ');

    // Set the content of the HTML element to the updated word
    wordDisplayElement.innerHTML = displayedWord.replace(/ /g, '&nbsp;'); // Replace spaces with non-breaking spaces

    // Check if the game has been won by removing the spaces from the displayed word
    if (displayedWord.replace(/\s+/g, '') == currentWord) {
        endGame();
        displayMessage(`Congratulations! You guessed the word: ${currentWord}`);
    }
}

// Update incorrectly guessed letters
function updateIncorrectLetters() {
    const incorrectLettersElement = document.getElementById('incorrect-letters');
    incorrectLettersElement.textContent = `Incorrect Letters: ${incorrectLetters.join(', ')}`;
}

// Reset the incorrect letters list
function resetIncorrectLetters() {
    const incorrectLettersElement = document.getElementById('incorrect-letters');
    incorrectLettersElement.textContent = ``;
    incorrectLetters = [];
}

// Function to update the hangman figure based on incorrect guesses
function updateHangmanFigure() {
    const hangmanFigureElement = document.getElementById('hangman-figure');

    const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

    hangmanFigureElement.innerHTML = '';

    for (let i = 0; i < hangmanFigureState; i++) {
        const part = document.createElement('div');
        part.classList.add('hangman-part', `hangman-${hangmanParts[i]}`);
        hangmanFigureElement.appendChild(part);
    }
}

// Function to update the guess count
function updateGuessCount() {
    const guessCountElement = document.getElementById('guess-count');
    guessCountElement.textContent = guessCount;
}

// Function to update the timer
function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timer;
}

// Function to generate letter buttons dynamically
function generateLetterButtons() {
    const lettersElement = document.getElementById('letters');
    lettersElement.innerHTML = '';

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => {
            console.log('Clicked letter button:', letter);

            // Check if the game has been won or if the word has been correctly guessed
            if (hangmanFigureState < hangmanParts.length && displayedWord !== currentWord) {
                handleLetterClick(letter);
                button.disabled = true; // Disable the button after it's clicked
            }
        });
        lettersElement.appendChild(button);
    }
}


// Define hangmanParts outside of handleLetterClick
const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

// Function to display messages on the main screen
function displayMessage(message) {
    const messageArea = document.getElementById('message-area');
    // Allows the reset button to remove the display area
    if (message == "reset") {
        messageArea.style.visibility = "hidden";
    } else {
        messageArea.style.visibility = "visible";
        messageArea.textContent = message;
        messageArea.classList.add('show');
    }
}

setTimeout(() => {
    const messageArea = document.getElementById('message-area');
    messageArea.classList.remove('show');
}, 3000);

// Function to handle letter button clicks
function handleLetterClick(letter) {
    console.log('Clicked letter:', letter);

    // Check if the game has already been won or lost
    if (hangmanFigureState < hangmanParts.length && displayedWord !== currentWord.toLowerCase()) {
        const lowercaseLetter = letter.toLowerCase(); // Convert the guessed letter to lowercase

        if (!guessedLetters.includes(lowercaseLetter) && /^[a-zA-Z]$/.test(letter)) {
            guessedLetters.push(lowercaseLetter);

            // Check if the guessed letter is incorrect
            if (!currentWord.toLowerCase().includes(lowercaseLetter)) {
                // Increment hangmanFigureState for incorrect guesses
                hangmanFigureState++;

                // Update incorrectLetters array
                incorrectLetters.push(lowercaseLetter);

                // Update the display of incorrect letters
                updateIncorrectLetters();
            }

            guessCount++;
            updateWordDisplay();
            updateHangmanFigure();
            updateGuessCount();

            // Check if the game has been won or lost after the update
            if (hangmanFigureState === hangmanParts.length) {
                // The hangman figure is complete
                displayMessage(`Game over - Hangman figure complete! The word was: ${currentWord}`);
                endGame();
            } else if (displayedWord.toLowerCase() === currentWord.toLowerCase()) {
                // All letters have been guessed
                displayMessage(`Congratulations! You guessed the word: ${currentWord}`);
                endGame();

                // Disable all letter buttons
                disableLetterButtons();
            }
        }
    }
}

// Function to disable all letter buttons
function disableLetterButtons() {
    const lettersElement = document.getElementById('letters');
    const buttons = lettersElement.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

// Function to handle "Get Hint" button click
document.getElementById('hint-button').addEventListener('click', () => getHint());
// Function to handle "Reset" button click
document.getElementById('reset-button').addEventListener('click', () => startGame());

function getHint() {
    const currentWordObj = wordList.find(wordObj => wordObj.word === currentWord);

    if (currentWordObj) {
        displayMessage(`Hint: ${currentWordObj.hint}`);
    } else {
        displayMessage('No hint available for this word.');
    }
}

var isLight = true;

// Function to toggle Lightmode / Darkmode.
function darkToggle() {
    var title = document.getElementById("title");
    title.classList.toggle("titledark-mode");
    var element = document.body;
    element.classList.toggle("dark-mode");
    var darkButton = document.getElementById("darkButton");
    if (isLight) {
        darkButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="fill:goldenrod;" height="45" viewBox="0 -960 960 960" width="45"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" /></svg>`;
    } else {
        darkButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="fill:goldenrod;" height="45" viewBox=" 0 -960 960 960" width="45">
        <path d = "M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" /></svg >`;
    }
    isLight = !isLight;
}

// Initialize the game
startGame();