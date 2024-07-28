const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Lets create a function to initialise the Game //
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newGameBtn.classList.remove("active");


}

initGame();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }

    else{
        currentPlayer = "X";
    }


    // UI Update //
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver(){
    let answer = "";
    // All the boxes should be non-empty and exactly same in value //
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&(gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])){

            // Check if winner id X //
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }

            else{
                answer = "O";
            }

             // Disable Pointer event //
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Now we know X/O is a winner //
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2 ]].classList.add("win");

        }
    });

    // it means we have a winner //
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Lets check whether there is tie //
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    // Board is FileSystemFileHandle, game is over //
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === ''){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer ;
        boxes[index].style.pointerEvents = "none";

        // Swap karo turn ko //
        swapTurn();

        // Check koi jeet toh nhi gya //
        checkGameOver();
    }
};


boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click",initGame);
