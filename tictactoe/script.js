let playerName = document.querySelector("#playerName");
let moves = 0;
let won;
let gameActive = true;
const fields = ["","","","","","","","",""];
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
    [6, 4, 2]
];

const checkForWin = () => {

    WinCombinations.forEach((combination) => { 
        const [firstFieldNumber, ...restCombination] = combination || [];
        const firstFieldValue = fields[firstFieldNumber];
        const allFieldsAreTheSame = firstFieldValue && restCombination.every((fieldNumber) => fields[fieldNumber] === firstFieldValue);

        if(!won && allFieldsAreTheSame) {
                won = true; 
                alert(`Player ${activePlayer} won!`);
                gameActive = false;
            }
    });

    if(moves === 9 && !won){
            alert("Its draw!");
            gameActive = false;
    }
};

const changePlayer = () => {
    activePlayer = activePlayer === "X" ? "O" : "X";
    playerName.innerHTML=`Player ${activePlayer} move`;
};

const isGameActive = () => {
    if(!gameActive){
        if (window.confirm("Do you want to play again?")) {
            gameActive = true;
            window.location.reload();
          }else{
            gameActive = false;
          }
    }
};
    document.querySelector("#gameBoard").addEventListener("click", function(e) {
        if(gameActive){
            if(e.target?.matches(".field")) {
                const {number} = e.target.dataset;
                if(fields[number] === "") {
                    moves++
                    fields[number] = activePlayer;
                    e.target.innerHTML= activePlayer;
                    checkForWin();
                    isGameActive();
                    changePlayer();
                }else {
                    alert("You choosed wrong field");
                }
            }
        }else {
            isGameActive();
        }
    });