// File Path
const FILE_PATH = "data.txt";

// Load Questions from File
function loadQuestions() {
  return fetch(FILE_PATH)
    .then((response) => response.text())
    .then((text) => {
      const lines = text.split("\n");
      const questions = [];
      let currentQuestion = null;

      lines.forEach((line) => {
        if (line.startsWith("Q:")) {
          if (currentQuestion) questions.push(currentQuestion);
          currentQuestion = {
            id: questions.length + 1,
            title: line.substring(2).trim(),
            description: "",
            answers: [],
          };
        } else if (line.startsWith("D:")) {
          if (currentQuestion) currentQuestion.description = line.substring(2).trim();
        } else if (line.startsWith("A:")) {
          if (currentQuestion) currentQuestion.answers.push(line.substring(2).trim());
        }
      });

      if (currentQuestion) questions.push(currentQuestion);
      return questions;
    })
    .catch((error) => {
      console.error("Error loading questions:", error);
      return [];
    });
}

// Save Questions to File
function saveQuestions(questions) {
  let fileContent = "";
  questions.forEach((question) => {
    fileContent += `Q: ${question.title}\n`;
    fileContent += `D: ${question.description}\n`;
    question.answers.forEach((answer) => {
      fileContent += `A: ${answer}\n`;
    });
  });

  // Note: This will not work in a browser environment due to security restrictions.
  // Use a backend server for file writing in production.
  console.log("Updated file content:\n", fileContent);
}

// Load Questions on Homepage
if (window.location.pathname.endsWith("index.html")) {
  loadQuestions().then((questions) => {
    const questionsDiv = document.getElementById("questions");
    questions.forEach((question) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.innerHTML = `
        <h3><a href="question.html?id=${question.id}">${question.title}</a></h3>
        <p>${question.description}</p>
      `;
      questionsDiv.appendChild(questionDiv);
    });
  });
}

// Handle Ask Question Form
if (window.location.pathname.endsWith("ask.html")) {
  const askForm = document.getElementById("ask-form");
  askForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const newQuestion = {
      id: Date.now(), // Use timestamp as a unique ID
      title,
      description,
      answers: [],
    };

    loadQuestions().then((questions) => {
      questions.push(newQuestion);
      saveQuestions(questions);
      alert("Question submitted!");
      window.location.href = "index.html";
    });
  });
}

// Load Question and Answers on Question Page
if (window.location.pathname.endsWith("question.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const questionId = parseInt(urlParams.get("id"));

  loadQuestions().then((questions) => {
    const question = questions.find((q) => q.id === questionId);

    if (question) {
      document.getElementById("question-title").textContent = question.title;
      document.getElementById("question-description").textContent = question.description;

      const answersDiv = document.getElementById("answers");
      question.answers.forEach((answer) => {
        const answerDiv = document.createElement("div");
        answerDiv.className = "answer";
        answerDiv.innerHTML = `<p>${answer}</p>`;
        answersDiv.appendChild(answerDiv);
      });

      const answerForm = document.getElementById("answer-form");
      answerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const answer = document.getElementById("answer
