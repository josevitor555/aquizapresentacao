import { quesions } from "./questions";
import { themes } from "./themes";

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const themeMarker = document.getElementById("theme-marker");

let currentQuestionIndex = 0;
let score = 0;
let participantsContainer = null;
let participantsDisplayed = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = quesions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  const currentThemeIndex = Math.floor(currentQuestionIndex / 2);
  themeMarker.innerHTML = themes[currentThemeIndex];

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(correct) {
  const selectedButton = correct.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score++; // Somando os pontos
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  
  questionElement.innerHTML = `Vocês acertaram ${score} de ${quesions.length}!`;
  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";

  if (!participantsDisplayed) {
    showParticipants();
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quesions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showParticipants() {

  if (!participantsContainer) {
    participantsContainer = document.createElement("div");

    participantsContainer.classList.add("participants-container");
    participantsContainer.innerHTML = `
      <div class="item flex items-center gap-4">
        <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
        <div class="text-white">
          <div class="text-base text-black font-medium">José Vitor</div>
          <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
        </div>
      </div>

      <div class="item flex items-center gap-4">
        <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
        <div class="text-white">
          <div class="text-base text-black font-medium">Anderson Veloso</div>
          <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
        </div>
      </div>

      <div class="item flex items-center gap-4">
        <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
        <div class="text-black">
          <div class="text-base text-black font-medium">Antônio Carlos</div>
          <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
        </div>
      </div>

      <div class="item flex items-center gap-4">
        <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
        <div class="text-white">
          <div class="text-base text-black font-medium">Jociel</div>
          <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
        </div>
      </div>
    `;

    const quizContainer = document.querySelector(".quiz");
    const nextButton = document.querySelector("#next-btn");

    if (quizContainer && nextButton) {
      quizContainer.insertBefore(participantsContainer, nextButton);
    }
  }

  participantsContainer.style.display = "block";
  participantsDisplayed = true;
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < quesions.length) {
    handleNextButton();
  } else {
    startQuiz();
    participantsDisplayed = false;
    if (participantsContainer) {
      participantsContainer.style.display = "none";
    }
  }
});

document.addEventListener("DOMContentLoaded", startQuiz);
