// Save this as [yourBlazerID].lab9.js

// Function to standardize user input and play the game
function playGame() {
  // Get user's choice and convert to lowercase
  var userChoice = document.getElementById("userChoice").value.toLowerCase();
  
  // Check for valid user input
  if (userChoice !== "rock" && userChoice !== "paper" && userChoice !== "scissors") {
      alert("Invalid choice. Please enter Rock, Paper, or Scissors.");
      return;
  }
  
  // Generate a random choice for the computer
  var computerChoice = generateComputerChoice();
  
  // Display choices in the console
  console.log("User chose: " + userChoice);
  console.log("Computer chose: " + computerChoice);
  
  // Determine the winner and display the result
  var result = determineWinner(userChoice, computerChoice);
  displayResult(result);
}

// Function to generate a random choice for the computer
function generateComputerChoice() {
  var choices = ["rock", "paper", "scissors"];
  var randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
      return "It's a tie!";
  } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper") ||
      (userChoice === "paper" && computerChoice === "rock")
  ) {
      return "User wins!";
  } else {
      return "Computer wins!";
  }
}

// Function to display the result on the webpage
function displayResult(result) {
  var resultElement = document.getElementById("result");
  resultElement.textContent = "Result: " + result;
}
