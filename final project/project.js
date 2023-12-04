const wordCategories = ['general', 'animals', 'sports'];

const wordsAndHints = {
    'general': {
        hints: 'A broad category',
        words: ['example', 'hangman', 'project', 'flower', 'computer', 'science', 'final']
    },
    'animals': {
        hints: 'A living organism that typically can move and can feed on organic substances',
        words: ['elephant', 'tiger', 'giraffe', 'lion', 'bear', 'monkey']
    },
    'sports': {
        hints: 'Physical activities that involve skill and competition',
        words: ['soccer', 'basketball', 'tennis', 'football', 'gymnastics']
    },
    'fashion': {
        hints: 'Clothing: design, style, type, or article; or pop culture',
        words: ['sweater', 'argyle', 'pants', 'plaid', 'skirt', 'vogue']
    }
};

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

// Function to get a random word from the selected category
function getRandomWord() {
    const category = wordCategories[Math.floor(Math.random() * wordCategories.length)];
    console.log('Selected category:', category);

    const selectedWords = wordsAndHints[category];
    console.log('Words for the category:', selectedWords);

    // Check if there are words in the selected category
    if (selectedWords && selectedWords.words.length > 0) {
        // Return a random word from the chosen category
        const randomIndex = Math.floor(Math.random() * selectedWords.words.length);
        const randomWord = selectedWords.words[randomIndex];
        console.log('Selected word:', randomWord);
        return randomWord;
    } else {
        console.error('No words found for the selected category.');
        return ''; // Return an empty string if no words are found
    }
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

    // Check if the game has been won
    if (displayedWord === currentWord) {
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
     if(message == "reset") {
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
                displayMessage('Game over - Hangman figure complete!');
                endGame();
            } else if (displayedWord === currentWord.toLowerCase()) {
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
    const category = wordCategories.find(cat => wordsAndHints.hasOwnProperty(cat) && wordsAndHints[cat].words.includes(currentWord));

    if (category && wordsAndHints.hasOwnProperty(category)) {
        displayMessage(`Hint: ${wordsAndHints[category].hints}`);
    } else {
        displayMessage('No hint available for this word.');
    }
}

// Initialize the game
startGame();
setTimer();