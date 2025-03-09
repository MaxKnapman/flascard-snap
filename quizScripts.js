const flashcards = document.querySelectorAll(".flashcard");

for (let i = 0; i < flashcards.length; i++) {
    flashcards[i].addEventListener("click", flip); // event listeners must be assigned individually
}

selectedQuestion = null;
selectedAnswer = null;

function flip() {
    this.innerText = this.getAttribute("content"); // initially flip card

    if (this.classList.contains("questionCard")) { // check if question or answer and solve for edge cases like two questions being selected
        if (selectedQuestion && selectedQuestion != this) {
            selectedQuestion.innerText = "";
        }
        selectedQuestion = this;
    } else if (this.classList.contains("answerCard")) {
        if (selectedAnswer && selectedAnswer != this) {
            selectedAnswer.innerText = "";
        }
        selectedAnswer = this;
    }
    if (selectedQuestion && selectedAnswer) { // check for match using pair attribute
        if (selectedQuestion.getAttribute("pair") == selectedAnswer.getAttribute("pair")) {
            selectedQuestion.classList.add("matched");
            selectedAnswer.classList.add("matched");
            selectedQuestion.removeEventListener("click", flip);
            selectedAnswer.removeEventListener("click", flip);
            selectedQuestion = null; // null assignment needed to avoid breakages
            selectedAnswer = null;
        } else {
            setTimeout(() => { // timeout makes cards readable after mismatch
            selectedQuestion.innerText = "";
            selectedAnswer.innerText = "";
            selectedQuestion = null;
            selectedAnswer = null;
            }, 1000);
        }
    }    
}