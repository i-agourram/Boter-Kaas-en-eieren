const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const restartBtn = document.querySelector(".restartBtn");
const winConditions = [ //Alle manieren om te winnen
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""]; //Zorgt ervoor dat je erop kan klikken
let currentPlayer = "X"; //De eerste speler
let running = false;

initializeGame(); //zorgt ervoor dat het spel begint

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex); 
    checkWinner();
}

function updateCell(cell, index) { //zorgt ervoor dat er een X of O in het vakje komt
    options[index] = currentPlayer; //zorgt ervoor dat het spel eindigt als iemand wint
    cell.textContent = currentPlayer;

}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; //zorgt ervoor dat na X, O kan spelen
    statusText.textContent = `${currentPlayer}'s turn` 
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) { //Hij maakt hier een array met een for loop
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue; //Als de vakjes leeg zijn gaat het spel door.
        }
         if (cellA == cellB && cellB == cellC){ //Als de vakjes ingevuld zijn stopt het spel en dan heeft iemand gewonnen.
            roundWon = true;
            break; 
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`; 
        running = false;
    }
    else if (!options.includes("")) { //Hij checkt of er lege vakjes zijn, als alles ingevuld is en niemand heeft gewonnen is het een Draw
        statusText.textContent = `Draw!`;
        running = false;
    }
    else {
        changePlayer(); 
    }
}

function restartGame() { 
    currentPlayer = "X"; 
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = ""); //Zorgt ervoor dat alles leeg gaat en dat je weer opnieuw kan spelen.
    running = true; 
}