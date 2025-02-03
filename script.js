const ROWS = 6;
const COLS = 7;
let currentPlayer = 1;
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

// Initialize the board
function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(event) {
    const col = +event.target.dataset.col;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            updateBoard();
            if (checkWin(row, col)) {
                statusElement.textContent = `Player ${currentPlayer} wins!`;
                boardElement.style.pointerEvents = 'none';
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                statusElement.textContent = `Player ${currentPlayer}'s turn (${currentPlayer === 1 ? 'Red' : 'Yellow'})`;
            }
            return;
        }
    }
    alert('Column is full!');
}

// Update the board display
function updateBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.dataset.player = board[row][col];
        }
    }
}

// Check for a win
function checkWin(row, col) {
    const directions = [
        { dr: 0, dc: 1 }, // Horizontal
        { dr: 1, dc: 0 }, // Vertical
        { dr: 1, dc: 1 }, // Diagonal down-right
        { dr: 1, dc: -1 } // Diagonal down-left
    ];

    for (const { dr, dc } of directions) {
        let count = 1;
        for (let step = 1; step < 4; step++) {
            const r = row + dr * step;
            const c = col + dc * step;
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== currentPlayer) break;
            count++;
        }
        for (let step = 1; step < 4; step++) {
            const r = row - dr * step;
            const c = col - dc * step;
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== currentPlayer) break;
            count++;
        }
        if (count >= 4) return true;
    }
    return false;
}

// Reset the game
function resetGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    currentPlayer = 1;
    statusElement.textContent = "Player 1's turn (Red)";
    boardElement.style.pointerEvents = '';
    createBoard();
}

// Start the game
createBoard();
 