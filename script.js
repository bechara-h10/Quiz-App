const questions = [
  {
    question: 'What is 4 x 4?',
    answers: [
      { text: 16, correct: true },
      { text: 8, correct: false },
    ],
  },
  {
    question: 'What is 2 x 2?',
    answers: [
      { text: 4, correct: true },
      { text: 2, correct: false },
    ],
  },
  {
    question: 'Who will win the champions league?',
    answers: [
      { text: 'Real Madrid', correct: false },
      { text: 'Bayern Munchen', correct: false },
      { text: 'PSG', correct: true },
      { text: 'Liverpool', correct: false },
    ],
  },
]

const startButton = document.getElementById('start-btn')
const questionContainer = document.querySelector('.question-container')
const questionDiv = document.querySelector('[data-question]')
const answerButtons = document.querySelector('.answer-buttons')
const nextButton = document.getElementById('next-btn')
const correctAnswersDiv = document.querySelector('.correct-answers')
const totalQuestions = questions.length
let correctAnswers
let shuffledQuestions, questionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', nextQuestion)

function startGame() {
  startButton.classList.add('hide')
  questionContainer.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  shuffled = shuffledQuestions.forEach((question) => {
    question.answers = question.answers.sort(() => Math.random() - 0.5)
  })
  questionIndex = 0
  correctAnswers = 0
  updateCorrectAnswers(correctAnswers)
  clearBodyStatus()
  setNextQuestion()
}

function setNextQuestion() {
  nextButton.classList.add('hide')
  displayQuestion(shuffledQuestions[questionIndex])
}

function displayQuestion(question) {
  questionDiv.innerText = `${question.question}`
  answerButtons.innerText = ''
  question.answers.forEach((answer) => {
    const answerButton = document.createElement('button')
    answerButton.classList.add('btn')
    answerButton.innerText = answer.text
    if (answer.correct) {
      answerButton.dataset.correct = answer.correct
    }
    answerButton.addEventListener('click', setCorrectStatus)
    answerButtons.appendChild(answerButton)
  })
}

function setCorrectStatus(e) {
  const button = e.target
  setBodyStatus(button.dataset.correct)
  ;[...answerButtons.children].forEach((answerButton) => {
    if (answerButton.dataset.correct) {
      answerButton.classList.add('correct')
    } else {
      answerButton.classList.add('wrong')
    }
  })
  updateCorrectAnswers(correctAnswers)
  displayControlButtons()
}

function setBodyStatus(correct) {
  if (correct) {
    document.body.classList.add('correct')
    correctAnswers++
    return
  }
  document.body.classList.add('wrong')
}

function displayControlButtons() {
  if (questions.length <= questionIndex + 1) {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    return
  }
  nextButton.classList.remove('hide')
}

function nextQuestion() {
  questionIndex++
  clearBodyStatus()
  setNextQuestion()
}

function clearBodyStatus() {
  document.body.classList.remove('correct')
  document.body.classList.remove('wrong')
}

function updateCorrectAnswers(correctAnswers) {
  correctAnswersDiv.innerText = `${correctAnswers}/${totalQuestions}`
}
