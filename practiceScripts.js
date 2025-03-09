const flashcards = document.querySelectorAll(".flashcard");

for (let i = 0; i < flashcards.length; i++) {
    flashcards[i].addEventListener("click", flip); // assign event listeners individually
}

function flip() {
    front = this.getAttribute("front");
    back = this.getAttribute("back");
    if (this.innerHTML == front) { // switch between front and back of card
        this.innerHTML = back;
    } else {
        this.innerHTML = front;
    }
}

