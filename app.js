let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Reset");
let newGameBtn = document.querySelector("#Newgame");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector(".msg");

let turnO = true; // true = O, false = X

// All winning combinations
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Reset game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Box click handler
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

// Check for winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return;
    }
  }
};


const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  pattern.forEach(index => boxes[index].classList.add("winner"));
  disableBoxes();
};


// Enable boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("winner");
  });
};


// Disable boxes
const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

// Event listeners
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
