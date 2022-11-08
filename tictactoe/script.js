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
const checkForWin=()=>{

    // for(let i = 0; i <=7; i++){
    //     const [number1, number2, number3] = WinCombinations[i];
    //     if(fields[number1] !== "" && fields[number1] === fields[number2] && fields[number1] === fields[number3]){
    //         alert(`Player ${activePlayer} won!`);
    //         return true;
    //     }
    // }
    WinCombinations.forEach((combination)=>{
        const [number1, number2, number3] = combination;
        //SPRAWDZENIE CZY POLE JEST PUSTE
     if(fields[number1] === fields[number2] && fields[number1] === fields[number3]){
        won = true; 
            alert(`Player ${activePlayer} won!`);

            //CO DAJE RETURN (DEBBUGER)
            return true;

        }
    })


    if(moves === 9 && !won){
            alert("Its draw!");
            result.innerHTML="Its draw";
            //CO DAJE RETURN (DEBBUGER)
            return true;
        }
};


// Event listner on game board
document.querySelector("#gameBoard").addEventListener("click", function(e) {
	// Check if clicked button match class 'field'

    debugger;

	if(e.target?.matches(".field")) {
		
		const {number} = e.target.dataset;
        //Check if choosed field is empty
        if(fields[number] === ""){
            //Add player chose to field [X/O]
            moves++
            fields[number] = activePlayer;
            //Add player chose to button text
            e.target.innerHTML= activePlayer;
            //Check for win function
            checkForWin();
            //Do this if there is a win or draw
            if(checkForWin()){
                if (confirm("Press okay to play again")) {
                    window.location.reload();
                    }
            }
            //OSOBNA METODA
            activePlayer = activePlayer === "X" ? "O" : "X";
            playerName.innerHTML=`Player ${activePlayer} move`;
            
        }else{
            alert("You choosed wrong field");
        }
	}
});