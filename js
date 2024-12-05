// Initialize the game variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

// Function to render the board
function renderBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";  // Clear the board

    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleClick(index));
        boardElement.appendChild(cellElement);
    });
}

// Function to handle a cell click
function handleClick(index) {
    if (gameOver || board[index] !== "") return;  // Ignore click if game is over or cell is already taken

    // Make the move
    board[index] = currentPlayer;
    renderBoard();

    // Check if the current player has won
    if (checkWin()) {
        document.getElementById("status").textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
    }

    // Check for a draw
    if (board.every(cell => cell !== "")) {
        document.getElementById("status").textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check if a player has won
function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to reset the game
document.getElementById("reset-btn").addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    renderBoard();
    document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
});

// Initialize the game
renderBoard();
document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
