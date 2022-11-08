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

const checkForWin = () =>{

    // OLD NOT OPTIMIZED CODE
    // for(let i = 0; i <=7; i++){
    //     const [number1, number2, number3] = WinCombinations[i];
    //     if(fields[number1] !== "" && fields[number1] === fields[number2] && fields[number1] === fields[number3]){
    //         alert(`Player ${activePlayer} won!`);
    //         return true;
    //     }
    // }

    WinCombinations.forEach((combination)=>{ 
        const [number1, number2, number3] = combination;
        if(fields[number1] !== "" && fields[number1] === fields[number2] && fields[number1] === fields[number3]){
                won = true; 
                alert(`Player ${activePlayer} won!`);
                gameActive = false;
            }
    })

    if(moves === 9 && !won){
            alert("Its draw!");
            result.innerHTML="Its draw";
            gameActive = false;
        }
};

const changePlayer = () =>{
    activePlayer = activePlayer === "X" ? "O" : "X";
    playerName.innerHTML=`Player ${activePlayer} move`;
};

const isGameActive = () =>{
    if(!gameActive){
        if (window.confirm("Do you want to play again?")) {
            gameActive = true;
            window.location.reload();
          }else{
            gameActive = false;
          }
    }
}

if(gameActive = true){
    document.querySelector("#gameBoard").addEventListener("click", function(e) {
        if(e.target?.matches(".field")) {
            const {number} = e.target.dataset;
            if(fields[number] === ""){
                moves++
                fields[number] = activePlayer;
                e.target.innerHTML= activePlayer;
                checkForWin();
                isGameActive();
                changePlayer();
            }else{
                alert("You choosed wrong field");
            }
        }
    });
}else{
    alert("You choosed to dont play again");
}