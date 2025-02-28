const cells = document.querySelectorAll(".square");
const msg = document.querySelector("#msg");
const player_x = document.getElementById("x");
const player_o = document.getElementById("o");

const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

let player;
let computer;
let currentPlayer;
let gameState = true;
let board = ["", "", "", "", "", "", "", "", ""];

// Event Listeners for Cells
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(cell, index));
});

// Player Selection
player_x.addEventListener("click", () => selectPlayer("X"));
player_o.addEventListener("click", () => selectPlayer("O"));

function selectPlayer(choice) {
    if (player) return; // Prevents re-selection

    player = choice;
    computer = player === "X" ? "O" : "X";
    currentPlayer = player;
    if(currentPlayer === "X"){
        player_x.style.background = "gray";
        player_x.style.padding = "0.5em";
        player_o.style.padding = "0.5em";
    }else{
        player_o.style.background = "gray";
        player_o.style.padding = "0.5em";
        player_x.style.padding = "0.5em";
    }

    player_x.style.cursor = "not-allowed";
    player_o.style.cursor = "not-allowed";
    msg.textContent = `Player ${player}, your turn!`;
}

function makeMove(cell, index) {
    if (!player || !gameState || board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.cursor = "not-allowed";

    if (checkWinner(currentPlayer)) {
        msg.textContent = `${currentPlayer} wins! 🎉`;
        gameState = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        msg.textContent = "It's a draw!";
        gameState = false;
        return;
    }

    // Switch turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Computer move if applicable
    if (currentPlayer === computer) {
        setTimeout(computerMove, 500);
    } else {
        msg.textContent = `Player ${currentPlayer}, your turn!`;
    }
}

function computerMove() {
    if (!gameState) return;

    let emptyCells = board.map((val, index) => (val === "" ? index : null)).filter(val => val !== null);
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    makeMove(cells[move], move);
}

function checkWinner(player) {
    return winCondition.some(pattern => pattern.every(index => board[index] === player));
}
