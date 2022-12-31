// rock beats scissor
// paper beats rock
// scissor beats rock

const beat_direct = {
    'rock': 'scissor',
    'paper': 'rock',
    'scissor': 'paper'
}

const idToSymbols = {
    'rock': '🪨',
    'paper': '📃',
    'scissor': '✂️'
}

/**
 * This function return a random choice of rock, paper or scissor
 * @returns {String}: computer's choice of rock, paper or scissor 
 */
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissor'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

/**
 * This function plays a round of rock, paper, scissor
 * @param {String} playerSelection: player's choice of rock, paper or scissor
 * @param {String} computerSelection: computer's choice of rock, paper or scissor
 * @returns {String}: result of the game
 */

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase()

    playerSymbol = idToSymbols[playerSelection]
    computerSymbol = idToSymbols[computerSelection]
    
    if (playerSelection == computerSelection) {
        return ["Draw", 'tie']
    }
    else if (beat_direct[playerSelection] == computerSelection) {
        return [`You Win, ${playerSymbol} beats ${computerSymbol}`, 'player']
    }
    else {
        return [`You Lose, ${computerSymbol} beats ${playerSymbol}`, 'computer']
    }
}

function updateResults(playerChoice, computerChoice, playerTotalWins, computerTotalWins, resultText){
    const playerChoiceElement = document.getElementById('player-choice');
    const computerChoiceElement = document.getElementById('computer-choice');
    const playerScore = document.getElementById('player-score');
    const computerScore = document.getElementById('computer-score');
    const result = document.getElementById('result');


    //Updating the player choice and computer choice
    playerChoiceElement.textContent = idToSymbols[playerChoice]
    computerChoiceElement.textContent = idToSymbols[computerChoice]

    //Updating the computer score and player score
    playerScore.textContent = playerTotalWins;
    computerScore.textContent = computerTotalWins;

    //Updating the text
    result.textContent = resultText;

}

let playerTotalWins = 0, computerTotalWins = 0;

function game(){
    const playerChoice = this.id;
    const computerChoice = getComputerChoice();
    
    const resultArray = playRound(playerChoice, computerChoice);
    const resultText = resultArray[0];
    const result = resultArray[1];

    if (result == 'player'){
        playerTotalWins+=1
    }
    else if (result == 'computer'){
        computerTotalWins+=1
    }

    updateResults(playerChoice, computerChoice,playerTotalWins, computerTotalWins, resultText);
    console.log(`player wins: ${playerTotalWins}`);
    console.log(`computer wins: ${computerTotalWins}`);

    if (playerTotalWins===5 || computerTotalWins===5){
        winner = playerTotalWins===5 ? 'player' : computerTotalWins===5 ? 'computer': NaN;
        playerTotalWins = 0, computerTotalWins = 0;
        window.confirm(`${winner} wins the game!`)
        return winner
    }
}


// getting the buttons
const buttons = document.querySelectorAll('.buttons button');

//adding event listeners to all the buttons
winner = buttons.forEach(button => {
    button.addEventListener('click',game)
})

console.log(winner)


