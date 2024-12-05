import { quesions } from "./questions";

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


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
    selectedButton.classList.add("correct");
    console.log("Classe 'correct' aplicada ao botão:", selectedButton);

    score++; // Somando os pontos

  } else {
    selectedButton.classList.add("incorrect");
    console.log("Classe 'incorrect' aplicada ao botão:", selectedButton);
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display =  "block";
}

function showScore() {
  resetState();
  
  // Exibindo a pontuação final
  questionElement.innerHTML = `Você acertou ${score} de ${quesions.length}`;
  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";
  
  // Exibindo os participantes do grupo
  showParticipants();
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
  const flexibleContainer = document.createElement("div");
  flexibleContainer.classList.add("participants-container"); // estilizar ess aclasse com css

  flexibleContainer.innerHTML = `
    
  <div class="flex items-center gap-4">
      <img class="img-small rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User">
      <div class="font-mediumtext-white">
          <div class="text-base text-white"> José Vitor </div>
          <div class="text-sm text-gray-400"> Participante do Grupo </div>
      </div>
  </div>
  
  <div class="flex items-center gap-4">
      <img class="img-small rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User">
      <div class="font-mediumtext-white">
          <div class="text-base text-white"> Anderson Veloso </div>
          <div class="text-sm text-gray-400"> Participante do Grupo </div>
      </div>
  </div>

  <div class="flex items-center gap-4">
      <img class="img-small rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User">
      <div class="font-mediumtext-white">
          <div class="text-base text-white"> Antônio Carlos </div>
          <div class="text-sm text-gray-400"> Participante do Grupo </div>
      </div>
  </div>

  <div class="flex items-center gap-4">
      <img class="img-small rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User">
      <div class="font-mediumtext-white">
          <div class="text-base text-white"> Jociel </div>
          <div class="text-sm text-gray-400"> Participante do Grupo </div>
      </div>
  </div>

  `;

  const app = document.querySelector(".app");
  app.appendChild(flexibleContainer);
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < quesions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

document.addEventListener("DOMContentLoaded", startQuiz);