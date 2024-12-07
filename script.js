const wordList = [
  { japanese: "こんにちは", english: "Hello" },
  { japanese: "ありがとう", english: "Thank you" },
  { japanese: "さようなら", english: "Goodbye" },
  { japanese: "おはよう", english: "Good morning" },
  { japanese: "お元気ですか", english: "How are you?" }
];

let currentWordIndex = 0;
let score = 0;
let level = 1;
let correctAnswers = 0;
let timeLeft = 30;
let gameInterval;
let countdownInterval;

function startGame() {
  document.getElementById('start-button').disabled = true;
  document.getElementById('japanese-input').disabled = false;
  document.getElementById('japanese-input').value = "";
  document.getElementById('score').innerText = score;
  document.getElementById('level').innerText = level;
  document.getElementById('time').innerText = timeLeft;

  gameInterval = setInterval(nextWord, 3000); // Show next word every 3 seconds
  countdownInterval = setInterval(updateTimer, 1000); // Countdown timer every second
}

function nextWord() {
  if (currentWordIndex >= wordList.length) {
    clearInterval(gameInterval);
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('final-score').innerText = score;
    playGameOverSound();
    return;
  }

  const currentWord = wordList[currentWordIndex];
  document.getElementById('word').innerText = currentWord.japanese;
  currentWordIndex++;
}

function updateTimer() {
  timeLeft--;
  document.getElementById('time').innerText = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    clearInterval(gameInterval);
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('final-score').innerText = score;
    playGameOverSound();
  }
}

function checkAnswer() {
  const userInput = document.getElementById('japanese-input').value.trim();
  const correctAnswer = wordList[currentWordIndex - 1].english;

  if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
    score += 10;
    correctAnswers++;
    document.getElementById('score').innerText = score;
    document.getElementById('correct-answers').innerText = correctAnswers;
    playCorrectSound();
  } else {
    playWrongSound();
  }

  if (correctAnswers >= 10) {
    document.getElementById('monster-status').innerText = 'Monster Defeated!';
  }
  nextWord();
}

function playCorrectSound() {
  document.getElementById('correct-sound').play();
}

function playWrongSound() {
  document.getElementById('wrong-sound').play();
}

function playGameOverSound() {
  document.getElementById('game-over-sound').play();
}

function resetGame() {
  score = 0;
  level = 1;
  correctAnswers = 0;
  timeLeft = 30;
  currentWordIndex = 0;
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('japanese-input').disabled = true;
  document.getElementById('start-button').disabled = false;
  document.getElementById('score').innerText = score;
  document.getElementById('level').innerText = level;
  document.getElementById('time').innerText = timeLeft;
  document.getElementById('monster-status').innerText = 'Defeat the Monster by Answering 10 Questions Correctly!';
  document.getElementById('correct-answers').innerText = '0';
}
