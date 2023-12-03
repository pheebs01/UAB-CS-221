const wordCategories = ['general', 'animals', 'sports'];
let currentWord = '';
let guessedLetters = [];
let hangmanFigureState = 0;
let guessCount = 0;
let timer = 0;

// Hints for each category
const hints = {
    'general': 'A broad category',
    'animals': 'A living organism that typically can move and can feed on organic substances',
    'sports': 'Physical activities that involve skill and competition',
    'fashion': 'Clothing: design, style, type, or article; or pop culture'
};

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
}

// Assuming there's a predefined list for each category
const words = {
    'general': ['example', 'hangman', 'project', 'flower', 'computer', 'science', 'final'],
    'animals': ['elephant', 'tiger', 'giraffe', 'lion', 'bear', 'monkey'],
    'sports': ['soccer', 'basketball', 'tennis', 'football', 'gymnastics'],
    'fashion': ['sweater', 'argyle', 'pants', 'plaid', 'skirt', 'vogue']
};

// Function to get a random word from the selected category
function getRandomWord() {
    const category = wordCategories[Math.floor(Math.random() * wordCategories.length)];
    console.log('Selected category:', category);

    const selectedWords = words[category];
    console.log('Words for the category:', selectedWords);

    // Check if there are words in the selected category
    if (selectedWords && selectedWords.length > 0) {
        // Return a random word from the chosen category
        const randomIndex = Math.floor(Math.random() * selectedWords.length);
        const randomWord = selectedWords[randomIndex];
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

    // Map each letter in the current word to either the letter or underscore if not guessed
    displayedWord = currentWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    // Set the content of the HTML element to the updated word
    wordDisplayElement.textContent = displayedWord;

    // Update correctLetters array with guessed letters
    correctLetters = currentWord
        .split('')
        .filter(letter => guessedLetters.includes(letter));

    // Check if the game has been won
    if (correctLetters.length === currentWord.length) {
        displayMessage(`Congratulations! You guessed the word: ${currentWord}`);
    }
}


// Update incorrectly guessed letters
function updateIncorrectLetters() {
    const incorrectLettersElement = document.getElementById('incorrect-letters');
    incorrectLettersElement.textContent = `Incorrect Letters: ${incorrectLetters.join(', ')}`;
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
            handleLetterClick(letter);
        });
        lettersElement.appendChild(button);
    }
}

// Define hangmanParts outside of handleLetterClick
const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

// Function to display messages on the main screen
function displayMessage(message) {
    const messageArea = document.getElementById('message-area');
    messageArea.textContent = message;
    messageArea.classList.add('show');
}

setTimeout(() => {
    const messageArea = document.getElementById('message-area');
    messageArea.classList.remove('show');
}, 3000);

// Function to handle letter button clicks
function handleLetterClick(letter) {
    console.log('Clicked letter:', letter);

    // Check if the game has already been won or lost
    if (hangmanFigureState < hangmanParts.length) {
        if (!guessedLetters.includes(letter) && /^[a-zA-Z]$/.test(letter)) {
            guessedLetters.push(letter);

            // Check if the guessed letter is incorrect
            if (!currentWord.includes(letter)) {
                // Increment hangmanFigureState for incorrect guesses
                hangmanFigureState++;

                // Update incorrectLetters array
                incorrectLetters.push(letter);

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
            } else if (displayedWord === currentWord) {
                // All letters have been guessed
                displayMessage(`Congratulations! You guessed the word: ${currentWord}`);
            }
        }
    }
}

// Function to handle "Get Hint" button click
document.getElementById('hint-button').addEventListener('click', () => getHint());

// Function to get a hint for the current word's category
function getHint() {
    const category = wordCategories.find(cat => currentWord.includes(cat));
    if (category && hints.hasOwnProperty(category)) {
        displayMessage(`Hint: ${hints[category]}`);
    } else {
        displayMessage('No hint available for this word.');
    }
}

// Initialize the game
startGame();