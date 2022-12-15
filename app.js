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

    // rock beats scissor
    // paper beats rock
    // scissor beats rock
    const beat_direct = {
        'rock': 'scissor',
        'paper': 'rock',
        'scissor': 'paper'
    }
    
    if (playerSelection == computerSelection) {
        return ("It's a Tie", 'tie')
    }
    else if (beat_direct[playerSelection] == computerSelection) {
        return (`You Win, ${playerSelection} beats ${computerSelection}`, 'player')
    }
    else {
        return (`You Lose, ${computerSelection} beats ${playerSelection}`, 'computer')
    }
}

/**
 * This function plays 5 rounds of rock, paper, scissor and prints the result
 */
function game() {
    playerTotalWins = 0
    computerTotalWins = 0
    // play 5 rounds
    for (let i = 0; i<5; i++) {
        const playerSelection = prompt("Rock, Paper or Scissor?")
        const computerSelection = getComputerChoice()
        const result = playRound(playerSelection, computerSelection)
        
        if (result[1] == 'player') {
            playerTotalWins += 1
        }
        else if (result[1] == 'computer') {
            computerTotalWins += 1
        }
        console.log(result[0])
        console.log(`Player: ${playerTotalWins} Computer: ${computerTotalWins}`)

    }

    if (playerTotalWins > computerTotalWins) {
        console.log("You Win!")
    }
    else if (playerTotalWins < computerTotalWins) {
        console.log("You Lose!")
    }
    else {
        console.log("It's a Tie!")
}   
}

game();




