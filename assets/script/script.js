if (document.location.pathname === "/index.html") {
  let test = document.querySelector("#nextPage")
  test.addEventListener("click", () => {
    let check = document.querySelector(".check")
    if (check.checked) {
      window.location.href = "quiz.html"
    }
  })
}

let index = 0
let corrette = 0
let sbagliate = 0
let totale = 0

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

if (document.location.pathname === "/select.html") {
  let start = document.querySelector("#startTest")
  
  start.addEventListener("click", () => {
    let questions = document.querySelector("#numberQuestions")
    let numbQuestions = questions.value;

    localStorage.setItem("numQuestions", numbQuestions);
  
    window.location.href = "/quiz.html";
    })
}

  

if (document.location.pathname === "/quiz.html") {
  
  let selectedNum = localStorage.getItem("numQuestions");

  let selectedQuestions = questions.slice(0, selectedNum);


  const domanda = document.querySelector("#domanda")
  const risposte = document.querySelector(".risposte")
  const contatore = document.querySelector("#contatore")

  function caricaDomanda() {
    
    function circleAnimation() {
      let circleForeground = document.querySelector(".circle-foreground");
        circleForeground.style.animation = "none";
        circleForeground.style.strokeDashoffset = "0";
        setTimeout(() => {
          circleForeground.style.animation = "countdown 60s linear forwards";
        }, 1000);
    }

    let countdownDuration = 59;
    const countdownText = document.querySelector("#countdown-text");

    let countdown = setInterval(function () {
      if (countdownDuration > 0) {
        countdownText.textContent = countdownDuration;
        countdownDuration--;
      } else {
        circleAnimation();
        countdownText.textContent = "0";
        sbagliate++
        localStorage.setItem("risposteSbagliate", sbagliate)
        localStorage.setItem("risposteCorrette", corrette)
        index++
        clearInterval(countdown);
        caricaDomanda()
      }
    }, 1000);

  
    if (index >= selectedQuestions.length) {
      window.location.href = "result.html";
      return;
    }

    const domandaCorrente = selectedQuestions[index]
    domanda.innerText = domandaCorrente.question
    contatore.innerHTML = `Question ${index + 1} <span class="totDomande">/ ${selectedQuestions.length}</span>`

    risposte.innerHTML = ""

    const allAnswers = [
      domandaCorrente.correct_answer,
      ...domandaCorrente.incorrect_answers,
    ];

    allAnswers.sort(() => Math.random() - 0.5)

    allAnswers.forEach((answer) => {
      const li = document.createElement("li")
      li.className = "risposta"
      li.textContent = answer
      risposte.appendChild(li)

      li.addEventListener("click", () => {
        clearInterval(countdown);
  
        let timerDisplay = document.querySelector("#countdown-text");

        if (timerDisplay) {
            timerDisplay.textContent = "60";
          if (document.querySelector(".risposta.cliccata")) return
        }

        li.classList.add("cliccata")

        circleAnimation()

        if (answer === domandaCorrente.correct_answer) {
          corrette++
          localStorage.setItem("risposteCorrette", corrette)
          li.classList.add("corretta")
        } else {
          sbagliate++
          localStorage.setItem("risposteSbagliate", sbagliate)
          li.classList.add("sbagliata")
        }
        document.querySelectorAll(".risposta").forEach((item) => {
          item.classList.add("disabled")
        })
        setTimeout(() => {
          index++
          caricaDomanda();
        }, 1000)
      }
      )
    }
    )
  }
  caricaDomanda()
};


if (document.location.pathname === "/result.html") {
  //Risoste corrette
  let corretteDiv = document.querySelector("#corrette")
  let corrette = document.createElement("p")
  corrette.className = "corretteP"

  let corrette2 = localStorage.getItem("risposteCorrette")

  corretteDiv.appendChild(corrette)
  corretteDiv.className = "corretteDiv"
  corrette.innerText = (corrette2 / questions.length * 100) + "%"
  //Contatore corrette
  let contatoreGiuste = document.createElement("p")
  contatoreGiuste.className = "contatoreGiuste"
  corretteDiv.appendChild(contatoreGiuste)
  contatoreGiuste.innerText = corrette2 + "/" + questions.length + " questions"


  //Risoste sbagliate
  let sbagliateDiv = document.querySelector("#sbagliate")
  let sbagliate = document.createElement("p")
  sbagliate.className = "sbagliateP"

  let sbagliate2 = localStorage.getItem("risposteSbagliate")

  sbagliateDiv.appendChild(sbagliate)
  sbagliateDiv.className = "sbagliateDiv"
  sbagliate.innerText = (sbagliate2 / questions.length * 100) + "%"

  //Contatore sbagliate
  let contatoreSbagliate = document.createElement("p")
  contatoreSbagliate.className = "contatoreSbagliate"
  sbagliateDiv.appendChild(contatoreSbagliate)
  contatoreSbagliate.innerText = sbagliate2 + "/" + questions.length + " questions"



  let risultato = document.querySelector("#risultato")

  let superato = document.createElement("p")
  let info = document.createElement("p")
  superato.innerHTML = `Congratulations!<br><span class="superato">You passed the exam.</span>`
  superato.className = "testo"
  info.innerHTML = "We'll send you the certificate in few minutes.<br>Check your email (including promotions / Spam folder)"
  info.className = "infoTesto"

  let nonSuperato = document.createElement("p")
  let info2 = document.createElement("p")
  nonSuperato.innerHTML = `Congratulations!<br><span class="superato">You didn't pass the exam.</span>`
  nonSuperato.className = "testo"
  info2.innerHTML = "We'll not send you the certificate in few minutes.<br>Don't check your email (including promotions / Spam folder)"
  info2.className = "infoTesto"

  if (contatoreGiuste.innerText >= "60%") {
    risultato.appendChild(superato)
    risultato.appendChild(info)
  } else {
    risultato.appendChild(nonSuperato)
    risultato.appendChild(info2)
  }


  let rate = document.querySelector("#rate")
  rate.addEventListener("click", () => {
    window.location.href = "review.html"
  }
  )
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['sbagliate', 'corrette'],
      datasets: [{
        data: [sbagliate2, corrette2],
        backgroundColor: ['#D20094', '#00FFFF'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      elements: {
        center: {
        }
      },
      plugins: {
        legend: {
          display: false
        },
      }
    }
  });
}


// Pagina 4
if (document.location.pathname === "/review.html") {
  const allStars = document.querySelectorAll(".star")

  allStars.forEach((star, i) => {
    star.onclick = function () {
      let currentStarLevel = i + 1;

      allStars.forEach((star, x) => {
        if (currentStarLevel >= x + 1) {
          star.classList.add("starClicked");
        } else {
          star.classList.remove("starClicked");
        }
      })
    }
  })
}

//JS della pagina review

const allStars = document.querySelectorAll(".star")

 allStars.forEach((star, i) => {
    star.onclick = function(){
        let currentStarLevel = i + 1;

        allStars.forEach ((star, x) =>{
            if (currentStarLevel >= x+1) {
                star.classList.add("starClicked");
            } else {
                star.classList.remove("starClicked");
            }
        })
    }
 })