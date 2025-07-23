(function () {
  // 1. Select DOM elements
  const rockBtn = document.getElementById('rock-btn');
  const paperBtn = document.getElementById('paper-btn');
  const scissorsBtn = document.getElementById('scissors-btn');
  const youScore = document.getElementById('you-score');
  const computerScore = document.getElementById('computer-score');
  const roundNumber = document.getElementById('round-number');
  const playerChoiceValue = document.getElementById('player-choice-value');
  const computerChoiceValue = document.getElementById('computer-choice-value');
  const roundResultMessage = document.getElementById('round-result-message');
  const finalResultMessage = document.getElementById('final-result-message');
  const resetBtn = document.getElementById('reset-game-btn');
  const choiceBtns = [rockBtn, paperBtn, scissorsBtn];

  let playerScore = 0;
  let compScore = 0;
  let round = 1;
  const maxRounds = 5;

  // 2. Add event listeners
  rockBtn.addEventListener('click', () => playRound('Rock'));
  paperBtn.addEventListener('click', () => playRound('Paper'));
  scissorsBtn.addEventListener('click', () => playRound('Scissors'));
  resetBtn.addEventListener('click', resetGame);

  // 3. Computer choice
  function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * 3)];
  }

  // 4. Play round logic
  function playRound(playerChoice) {
    if (round > maxRounds) return;

    const computerChoice = getComputerChoice();

    playerChoiceValue.textContent = getEmoji(playerChoice) + ' ' + playerChoice;
    computerChoiceValue.textContent = getEmoji(computerChoice) + ' ' + computerChoice;

    let result = '';
    if (playerChoice === computerChoice) {
      result = "It's a tie!";
    } else if (
      (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
      (playerChoice === 'Paper' && computerChoice === 'Rock') ||
      (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      playerScore++;
      result = 'You win this round!';
    } else {
      compScore++;
      result = 'Computer wins this round!';
    }

    youScore.textContent = playerScore;
    computerScore.textContent = compScore;
    roundResultMessage.textContent = result;

    if (round < maxRounds) {
      round++;
      roundNumber.textContent = `Round ${round}/${maxRounds}`;
    } else {
      // Prevent double clicks on final round
      disableChoiceBtns();
      // Optionally add a small delay before showing final result
      setTimeout(endGame, 150);
    }
  }

  // 5. End game and show final result
  function endGame() {
    let finalMsg = '';
    if (playerScore > compScore) {
      finalMsg = '🎉 You win the game!';
    } else if (playerScore < compScore) {
      finalMsg = '😢 Computer wins the game!';
    } else {
      finalMsg = "🤝 It's a tie game!";
    }
    finalResultMessage.textContent = finalMsg;
  }

  // 6. Disable choice buttons
  function disableChoiceBtns() {
    choiceBtns.forEach(btn => btn.disabled = true);
  }

  // 7. Reset game
  function resetGame() {
    playerScore = 0;
    compScore = 0;
    round = 1;
    youScore.textContent = '0';
    computerScore.textContent = '0';
    roundNumber.textContent = `Round 1/${maxRounds}`;
    playerChoiceValue.textContent = '—';
    computerChoiceValue.textContent = '—';
    roundResultMessage.textContent = '';
    finalResultMessage.textContent = '';
    choiceBtns.forEach(btn => btn.disabled = false);
  }

  // Helper: Emoji for choices
  function getEmoji(choice) {
    switch (choice) {
      case 'Rock': return '✊';
      case 'Paper': return '✋';
      case 'Scissors': return '✌️';
      default: return '';
    }
  }
})();