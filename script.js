let questions = JSON.parse(localStorage.getItem('questions')) || []

const startButton = document.getElementById('start-btn')
const questionContainer = document.querySelector('.question-container')
const questionDiv = document.querySelector('[data-question]')
const answerButtons = document.querySelector('.answer-buttons')
const nextButton = document.getElementById('next-btn')
const correctAnswersDiv = document.querySelector('.correct-answers')
const addQuestionButton = document.querySelector('.add-question-btn')
const addContainer = document.querySelector('.add-container')
const returnButton = document.querySelector('.return-btn')
const addButton = document.querySelector('.add-btn')
const questionInput = document.getElementById('question-input')
const answerInputs = document.querySelectorAll('#answer-input')
const errorContainer = document.querySelector('.error-container')
const successContainer = document.querySelector('.success')
const clearQuestionsButton = document.querySelector('.clear-questions-btn')
const checkContainer = document.querySelector('.check-delete')
const noButton = document.querySelector('.no-btn')
const yesButton = document.querySelector('.yes-btn')
let totalQuestions
let correctAnswers
let shuffledQuestions, questionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', nextQuestion)
addQuestionButton.addEventListener('click', displayAddContainer)
returnButton.addEventListener('click', hideAddConainer)
addButton.addEventListener('click', createQuestion)
clearQuestionsButton.addEventListener('click', displayCheckContainer)
noButton.addEventListener('click', hideCheckContainer)
yesButton.addEventListener('click', clearQuestions)
function startGame() {
  startButton.classList.add('hide')
  questionContainer.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  shuffled = shuffledQuestions.forEach((question) => {
    question.answers = question.answers.sort(() => Math.random() - 0.5)
  })
  questionIndex = 0
  correctAnswers = 0
  totalQuestions = questions.length
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
    answerButton.addEventListener('click', setCorrectStatus, { once: true })
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

function displayAddContainer() {
  addContainer.style.transform = 'translateX(0)'
}

function hideAddConainer() {
  addContainer.style.transform = 'translateX(-150%)'
  successContainer.classList.remove('show')
  errorContainer.classList.remove('show')
}

function createQuestion() {
  const everyAnswerInputNotEmpty = [...answerInputs].every(
    (input) => input.value !== ''
  )
  const hasOneCheckedRadionButton = [...answerInputs].some(
    (answerInput) => answerInput.nextElementSibling.children[0].checked == true
  )
  if (
    questionInput.value !== '' &&
    everyAnswerInputNotEmpty &&
    hasOneCheckedRadionButton
  ) {
    let questionObj = {
      question: questionInput.value,
      answers: [
        {
          text: answerInputs[0].value,
          correct: answerInputs[0].nextElementSibling.children[0].checked,
        },
        {
          text: answerInputs[1].value,
          correct: answerInputs[1].nextElementSibling.children[0].checked,
        },
        {
          text: answerInputs[2].value,
          correct: answerInputs[2].nextElementSibling.children[0].checked,
        },
        {
          text: answerInputs[3].value,
          correct: answerInputs[3].nextElementSibling.children[0].checked,
        },
      ],
    }
    questions.push(questionObj)
    clearInputs()
    successContainer.innerText = 'Question added'
    successContainer.classList.add('show')
    errorContainer.classList.remove('show')
    localStorage.setItem('questions', JSON.stringify(questions))
    reset()
    return
  }
  errorContainer.innerText = 'No input should be empty'
  successContainer.classList.remove('show')
  errorContainer.classList.add('show')
}

function clearInputs() {
  questionInput.value = ''
  answerInputs.forEach((input) => {
    input.value = ''
    input.nextElementSibling.children[0].checked = false
  })
}

function displayCheckContainer() {
  checkContainer.style.transform = 'translateY(0)'
}

function clearQuestions() {
  questions = []
  localStorage.setItem('questions', JSON.stringify(questions))
  location.reload(true)
  hideCheckContainer()
  reset()
}

function hideCheckContainer() {
  checkContainer.style.transform = 'translateY(200%)'
}

function reset() {
  startButton.innerText = 'Start'
  startButton.classList.remove('hide')
  questionContainer.classList.add('hide')
  correctAnswersDiv.innerText = 'Score'
}
