let playerTotalWins = 0, computerTotalWins = 0;
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
    'scissor': '✂️',
    '?': '?'
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

/**
 * This function updates the results of the game
 * @param {String} playerChoice: player's choice of rock, paper or scissor
 * @param {String} computerChoice: computer's choice of rock, paper or scissor
 * @param {Number} playerTotalWins: total number of wins of the player
 * @param {Number} computerTotalWins: total number of wins of the computer
 * @param {String} resultText: result of the game
 * @returns {undefined}
 */
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

/**
 * This function shows the popup and overlay when the game is over
 * @param {String} winner: winner of the game
 * @returns {undefined}
 * */
function showPopup(winner){
    //getting popup and overlay elements
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    //getting the winner element
    const winnerElement = document.getElementById('winner');
    
    winnersText = winner==='player' ? 'You Win' : winner==='computer' ? 'You Lose' : NaN;
    winnerElement.textContent = winnersText

    //adding active class to these elements
    overlay.classList.add('active');
    popup.classList.add('active');

    //removing active class from these elements if overlay is clicked
    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        popup.classList.remove('active');
    });

    //resetting the game if play again button is clicked
    const playAgainButton = document.getElementById('play-again');
    playAgainButton.addEventListener('click', () => {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        playerTotalWins = 0, computerTotalWins = 0;
        updateResults('?','?',0,0,'Play a round');
    }
    )


}

/**
 * This function checks if the game is over
 * @param {Number} playerTotalWins: total number of wins of the player
 * @param {Number} computerTotalWins: total number of wins of the computer
 * @returns {Boolean}: true if the game is over, false otherwise
 * */
function isGameOver(playerTotalWins, computerTotalWins){
    return playerTotalWins===5 || computerTotalWins===5;
}

/**
 * This function is the main game function
 * @returns {undefined}
 * */
function game(){
    if (isGameOver(playerTotalWins, computerTotalWins)){
        showPopup(winner);
        return;
    }
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

    if (playerTotalWins===5 || computerTotalWins===5){
        winner = playerTotalWins===5 ? 'player' : computerTotalWins===5 ? 'computer': NaN;
        showPopup(winner);
    }
}


// getting the buttons
const buttons = document.querySelectorAll('.buttons button');

//adding event listeners to all the buttons
buttons.forEach(button => {
    button.addEventListener('click',game)
})


