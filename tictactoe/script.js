let playerName = document.querySelector("#playerName");
let moves = 0;
let won;

//Table of fields
const fields = ["","","","","","","","",""];
//Declare which player is first
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

//ZMIANA NA FUNCKJE STRZALKOWA
let checkForWin = () =>{

    // for(let i = 0; i <=7; i++){
    //     const [number1, number2, number3] = WinCombinations[i];
    //     if(fields[number1] !== "" && fields[number1] === fields[number2] && fields[number1] === fields[number3]){
    //         alert(`Player ${activePlayer} won!`);
    //         return true;
    //     }
    // }
    WinCombinations.forEach((combination)=>{ 

        const [number1, number2, number3] = combination;
            // fields.every( (val, i, arr) => val !== "" && val === "X" || val === "O" ) MAYBE WORK?
            //WinCombinations.every( (val, i, arr) => val === val[0])

     if(fields[number1] !== "" && fields[number1] === fields[number2] && fields[number1] === fields[number3]){
            won = true; 
            alert(`Player ${activePlayer} won!`);
        }
    })


    // if(moves === 9 && !won){
    //         alert("Its draw!");
    //         result.innerHTML="Its draw";
    //         //CO DAJE RETURN (DEBBUGER)
    //         return true;
    //     }
};

let changePlayer = () =>{
    activePlayer = activePlayer === "X" ? "O" : "X";
    playerName.innerHTML=`Player ${activePlayer} move`;
}


// Event listner on game board
document.querySelector("#gameBoard").addEventListener("click", function(e) {
	// Check if clicked button match class 'field'

	if(e.target?.matches(".field")) {
		
		const {number} = e.target.dataset;
        //Check if choosed field is empty
        if(fields[number] === ""){
            moves++
            fields[number] = activePlayer;
            e.target.innerHTML= activePlayer;
            checkForWin();
            changePlayer();
        }else{
            alert("You choosed wrong field");
        }
	}
});