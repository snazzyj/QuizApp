let questionNum = 0;
let score = 0;

//intialize the start of the quiz
//gets rid of the the start button
//adds in the questions and the answers
function startQuiz(){
  $('.startQuiz').on('click', '.startButton', function(event) {
    $('.startQuiz').remove();
    $('.questionScore').css('display', 'block');
    $('.questionAnswer').css('display', 'block');
  })
}

//renders each question and display thems
//display final score once question num equals to 10

function renderQuestion(){
  $('.questionAnswer').html(' ');
  if(questionNum < questions.length){
   $('.questionAnswer').html(`
        <h2>${questions[questionNum].question}</h2>

        <form id="answerList">
   
            <label for="answerOption1">
              <input type="radio" value="${questions[questionNum].answers[0]}" name="answer" id="answerOption1" required>
                <span class="textAnswers">${questions[questionNum].answers[0]}</span>
            </label>

            <label for="answerOption2">
              <input type="radio" value="${questions[questionNum].answers[1]}" name="answer" id="answerOption2" required>
                <span class="textAnswers">${questions[questionNum].answers[1]}</span>
            </label>

            <label for="answerOption3">
              <input type="radio" value="${questions[questionNum].answers[2]}" name="answer" id="answerOption3" required>
                <span class="textAnswers">${questions[questionNum].answers[2]}</span>
            </label>

            <label for="answerOption4">
              <input type="radio" value="${questions[questionNum].answers[3]}" name="answer" id="answerOption4" required>
                <span class="textAnswers">${questions[questionNum].answers[3]}</span>
            </label>

            <input type="submit" class="submitButton"></input>
         
        </form>`);
  } else {
    //render the final score screen with play again button
    playAgain();
  }
 
}

//increament questionNum by 1
function changeQuestionNum(){
  questionNum = questionNum + 1;
  $('.question').html(questionNum);
}

//Validate the user answer
//if correct provide feedback
//if wrong provide feedback
function validateAnswer(){
  $('.questionAnswer').on('submit', 'form', function(event){
    event.preventDefault();
    let correctAns = questions[questionNum].correctAnswer;
    let userAns = $('input[name=answer]:checked').val();

    if(userAns === correctAns) {
      correctAnswer();
      nextQuestion();
    } else {
      wrongAnswer();
      nextQuestion();
    }
  });
}


//feedback if answer is correct
function correctAnswer(){
  $('.questionAnswer').html(`<div class="feedback">
  <img src="images/PikachuVictory.png" alt="Happy Pikachu" class="icon pikachu">
    <div class="correctAns">
    <h3>You got it correct!</h3></div>
    <button type=button class="nextQuestionButton">Next</button>
   </div>
  `);
  changeAndUpdateScore();
  
}
//feedback if answer is wrong
function wrongAnswer(){
  $('.questionAnswer').html(`<div class="feedback">
  <img src="images/duck-hunt-png-3.png" alt="Laughing Duck" class="icon"> 
    <div class="correctAns">
    <h3>You got it wrong</h3></div>
     <p>The correct answer was: <span>${questions[questionNum].correctAnswer}</span></p>
    <button type=button class="nextQuestionButton">Next</button>
    </div>
  `);
  
}

//Increments score by 1 for each correct answer
//Updates the html value to the current score value
function changeAndUpdateScore(){
    score++;
  $('.score').html(score);
}

//renders results and play again button
//re-run application if the play again button is pressed
function playAgain(){
 $('.end').html(`<div class="endQuiz"> <div class="finalScoreContent">
      <h2>Final Score:<span class="finalScore">${score}</span></h2>
      </div>
      <button class="replayButton">Play Again?</button>
      </div>
    `)
    $('.endQuiz').on('click', '.replayButton', function(event){
      location.reload();
    })
}

//validate the answer
//change the questionnumber by 1 
//render next question to screen
function nextQuestion(){
  $('.feedback').on('click', '.nextQuestionButton', function(event) {
    changeQuestionNum();
    renderQuestion();
  })
}


//runs the quiz
function createQuiz(){
  startQuiz();
  renderQuestion();
  nextQuestion();
  validateAnswer();
}

$(createQuiz);