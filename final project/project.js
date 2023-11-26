const wordCategories = ['general', 'animals', 'sports']; // Add more categories as needed
let currentWord = '';
let guessedLetters = [];
let hangmanFigureState = 0; // Use this to track the hangman figure progression
let guessCount = 0;
let timer = 0;

// Hints for each category
const hints = {
    'general': 'A broad category',
    'animals': 'A living organism that typically can move and can feed on organic substances',
    'sports': 'Physical activities that involve skill and competition'
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

// Function to get a random word from the selected category
function getRandomWord() {
    const category = wordCategories[Math.floor(Math.random() * wordCategories.length)];
    // Logic to fetch a random word from the chosen category (you can use an API or a predefined list)
    // Assuming we have a predefined list for each category
    const words = {
        'general': ['example', 'hangman', 'project'],
        'animals': ['elephant', 'tiger', 'giraffe'],
        'sports': ['soccer', 'basketball', 'tennis']
    };
    return words[category][Math.floor(Math.random() * words[category].length)];
}

// Function to update the displayed word with guessed letters
function updateWordDisplay() {
    const wordDisplayElement = document.getElementById('word-display');
    wordDisplayElement.textContent = currentWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

// Function to update the hangman figure based on incorrect guesses
function updateHangmanFigure() {
    const hangmanFigureElement = document.getElementById('hangman-figure');
    hangmanFigureElement.innerHTML = '';

    const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

    for (let i = 0; i < hangmanFigureState; i++) {
        const part = document.createElement('div');
        part.classList.add('hangman-part', `hangman-${hangmanParts[i]}`);
        hangmanFigureElement.appendChild(part);
    }
}

// Function to update the guess count
function updateGuessCount() {
    document.getElementById('guess-count').textContent = guessCount;
}

// Function to update the timer
function updateTimer() {
    document.getElementById('timer').textContent = timer;
}

// Function to generate letter buttons dynamically
function generateLetterButtons() {
    const lettersElement = document.getElementById('letters');
    lettersElement.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleLetterClick(letter));
        lettersElement.appendChild(button);
    }
}

// Function to handle letter button clicks
function handleLetterClick(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!currentWord.includes(letter)) {
            // Increment hangmanFigureState for incorrect guesses
            hangmanFigureState++;
        }
        guessCount++;
        updateWordDisplay();
        updateHangmanFigure();
        updateGuessCount();
        // Add more logic as needed
    }
}

// Function to handle "Get Hint" button click
document.getElementById('hint-button').addEventListener('click', () => getHint());

// Function to get a hint for the current word's category
function getHint() {
    const category = wordCategories.find(cat => currentWord.includes(cat));
    if (category) {
        alert(`Hint: ${hints[category]}`);
    } else {
        alert('No hint available for this word.');
    }
}

// Initialize the game
startGame();