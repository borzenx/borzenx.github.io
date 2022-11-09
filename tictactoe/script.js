let playerName = document.querySelector("#playerName");
let moves = 0;
let won;
const fields = ["", "", "", "", "", "", "", "", ""];
let activePlayer = "X";
const WinCombinations = [
  //Vertical Win
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Horizontal Win
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonal Win
  [0, 4, 8],
  [6, 4, 2],
];

const checkForWin = () => {
  WinCombinations.forEach((combination) => {
    const [firstFieldNumber, ...restCombination] = combination || [];
    const firstFieldValue = fields[firstFieldNumber];
    const allFieldsAreTheSame =
      firstFieldValue &&
      restCombination.every(
        (fieldNumber) => fields[fieldNumber] === firstFieldValue
      );

    if (!won && allFieldsAreTheSame) {
      won = true;
      alert(`Player ${activePlayer} won!`);
    }
  });

  if (moves === 9 && !won) {
    won = true;
    alert("Its draw!");
  }
};

const changePlayer = () => {
  activePlayer = activePlayer === "X" ? "O" : "X";
  playerName.innerHTML = `Player ${activePlayer} move`;
};

document.querySelector("#gameBoard").addEventListener("click", (e) => {
  if (!won) {
    if (e.target?.matches(".field")) {
      const { number } = e.target.dataset;
      if (fields[number] === "") {
        moves++;
        fields[number] = activePlayer;
        e.target.innerHTML = activePlayer;
        checkForWin();
        changePlayer();
      } else {
        alert("You choosed wrong field");
      }
    }
  } else {
    if (confirm("Do you want to play again?")) {
      window.location.reload();
    }
  }
});
