const buttons = document.querySelectorAll('.buttons button');
const resultDisplay = document.getElementById('result');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.id;
        const computerChoice = getComputerChoice();
        const winner = determineWinner(userChoice, computerChoice);
        displayResult(winner, userChoice, computerChoice);
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'tie';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'user';
    } else {
        return 'computer';
    }
}

function displayResult(winner, userChoice, computerChoice) {
    let resultMessage = '';

    if (winner === 'tie') {
        resultMessage = 'It\'s a tie!';
    } else if (winner === 'user') {
        resultMessage = `You win! ${userChoice} beats ${computerChoice}.`;
    } else {
        resultMessage = `Computer wins! ${computerChoice} beats ${userChoice}.`;
    }

    resultDisplay.textContent = resultMessage;
}
