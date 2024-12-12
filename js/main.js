import { quesions } from "./questions";
import { themes } from "./themes";

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const themeMarker = document.getElementById("theme-marker");

let currentQuestionIndex = 0;
let score = 0;

// let participantsContainer = null;
// let participantsDisplayed = false;

let resultDisplayed = false;
let resultContainer = null;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";

  if (resultDisplayed && resultContainer) {
    resultContainer.style.display = "none";
    resultDisplayed = false;
  }

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

  quesions[currentQuestionIndex].userAnswer = {
    text: selectedButton.innerHTML,
    correct: isCorrect
  };

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showResults() {
  resetState();

  if (!resultDisplayed) {
    
    // Criar o container do gabarito apenas se ele ainda não existir
    resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");

    quesions.forEach((question, index) => {
      const questionResult = document.createElement("div");
      questionResult.classList.add("result-item", "flex", "flex-col", "gap-2");

      const questionTitle = document.createElement("div");
      questionTitle.classList.add("text-black", "text-base", "font-medium");
      questionTitle.innerHTML = `${index + 1}. ${question.question}`;

      const answerDetail = document.createElement("div");
      answerDetail.classList.add("text-sm", "text-gray-700");
      const isCorrect = index < currentQuestionIndex && quesions[index].userAnswer?.correct;

      answerDetail.innerHTML = `
        <div> Resposta Correta: <b>${question.answers.find(a => a.correct).text}</b> </div>
        <div>Sua Resposta: ${
          isCorrect
            ? `<span class="text-green-500 font-medium"> Você acertou! </span>`
            : `<span class="text-red-500 font-medium"> Você errou. </span>`
        }</div>
      `;

      questionResult.appendChild(questionTitle);
      questionResult.appendChild(answerDetail);
      resultContainer.appendChild(questionResult);
    });

    const quizContainer = document.querySelector(".quiz");
    quizContainer.appendChild(resultContainer);

    resultDisplayed = true; // Marca que o gabarito foi exibido
  }

  // Move o botão "Jogar Novamente" após o gabarito
  const quizContainer = document.querySelector(".quiz");
  quizContainer.insertBefore(nextButton, null);

  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";

  questionElement.innerHTML = `Você acertou ${score} de ${quesions.length}!`;

  // if (!participantsContainer) {
  //   showParticipants();
  // }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quesions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// function showParticipants() {

//   if (!participantsContainer) {
//     participantsContainer = document.createElement("div");

//     participantsContainer.classList.add("participants-container");
//     participantsContainer.innerHTML = `
//       <div class="item flex items-center gap-4">
//         <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
//         <div class="text-white">
//           <div class="text-base text-black font-medium">José Vitor</div>
//           <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
//         </div>
//       </div>

//       <div class="item flex items-center gap-4">
//         <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
//         <div class="text-white">
//           <div class="text-base text-black font-medium">Anderson Veloso</div>
//           <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
//         </div>
//       </div>

//       <div class="item flex items-center gap-4">
//         <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
//         <div class="text-black">
//           <div class="text-base text-black font-medium">Antônio Carlos</div>
//           <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
//         </div>
//       </div>

//       <div class="item flex items-center gap-4">
//         <img class="img-small rounded-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
//         <div class="text-white">
//           <div class="text-base text-black font-medium">Jociel</div>
//           <div class="text-sm text-gray-950 font-light">Participante do Grupo</div>
//         </div>
//       </div>
//     `;

//     const quizContainer = document.querySelector(".quiz");
//     const nextButton = document.querySelector("#next-btn");

//     if (quizContainer && nextButton) {
//       quizContainer.insertBefore(participantsContainer, nextButton);
//     }
//   }

//   participantsContainer.style.display = "block";
//   participantsDisplayed = true;
// }

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < quesions.length) {
    handleNextButton();
  } else {
    startQuiz();
    // participantsDisplayed = false;
    // if (participantsContainer) {
    //   participantsContainer.style.display = "none";
    // }
  }
});

document.addEventListener("DOMContentLoaded", startQuiz);
