if (document.location.pathname === "/index.html") {
  let test = document.querySelector("#nextPage")
  test.addEventListener("click", () => {
    let check = document.querySelector(".check")
    if (check.checked) {
      window.location.href = "quiz.html"
    }
  })
}

if (document.location.pathname === "/quiz.html") {
  const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];

  let index = 0
  let corrette = 0
  let sbagliate = 0

  const domanda = document.querySelector("#domanda")
  const risposte = document.querySelector(".risposte")
  const contatore = document.querySelector("#contatore")

  function caricaDomanda() {
    
    let countdownDuration = 60;
    const countdownText = document.querySelector("#countdown-text");

    let countdown = setInterval(function () {
    if (countdownDuration > 0) {
      countdownText.textContent = countdownDuration + "s";
      countdownDuration--;
      } else {
        countdownText.textContent = "0";
        clearInterval(countdown);
        sbagliate++
        index++
        caricaDomanda()
      }
    }, 1000);

    const domandaCorrente = questions[index]
    domanda.innerText = domandaCorrente.question
    contatore.textContent = `Question ${index + 1} / 10`

    risposte.innerHTML = ""

    const allAnswers = [
      domandaCorrente.correct_answer,
      ...domandaCorrente.incorrect_answers,
    ];

    allAnswers.sort(()=> Math.random()-0.5)

    allAnswers.forEach((answer) => {
      const li = document.createElement("li")
      li.className = "risposta"
      li.textContent = answer
      risposte.appendChild(li)

      li.addEventListener("click", () => {
        clearInterval(countdown);
        if (answer === domandaCorrente.correct_answer) {
          corrette++
          li.style.color = "green"
        } else {
          sbagliate++
          li.style.color = "red"
        }
        setTimeout(() => {
          index++
          caricaDomanda();
        }, 1000)
      }
    )
    })
  }
  
  caricaDomanda()
  };