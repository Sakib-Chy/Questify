// Sample Data (Replace with a backend API in a real application)
let questions = [
    {
      id: 1,
      title: "How to learn JavaScript?",
      description: "I'm new to programming. How can I learn JavaScript effectively?",
      answers: [
        "Start with the basics and practice daily.",
        "Follow online tutorials and build projects.",
      ],
    },
    {
      id: 2,
      title: "Best resources for learning React?",
      description: "What are the best resources to learn React in 2023?",
      answers: [
        "The official React documentation is a great place to start.",
        "Try courses on platforms like Udemy or freeCodeCamp.",
      ],
    },
  ];
  
  // Load Questions on Homepage
  if (window.location.pathname.endsWith("index.html")) {
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
  }
  
  // Handle Ask Question Form
  if (window.location.pathname.endsWith("ask.html")) {
    const askForm = document.getElementById("ask-form");
    askForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
      };
      questions.push(newQuestion);
      alert("Question submitted!");
      window.location.href = "index.html";
    });
  }
  
  // Load Question and Answers on Question Page
  if (window.location.pathname.endsWith("question.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = parseInt(urlParams.get("id"));
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
        const answer = document.getElementById("answer").value;
        question.answers.push(answer);
        alert("Answer submitted!");
        window.location.reload();
      });
    } else {
      document.getElementById("question-title").textContent = "Question not found.";
    }
  }