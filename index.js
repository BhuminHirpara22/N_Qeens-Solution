let boardSize = 0;
let sol = 0;
const queenImageSrc = './queen.png';

function getBoardSize() {
    boardSize = document.getElementById("size").value;
}

function createBoard(n) {
    let board_array = new Array(n);
    for (let i = 0; i < n; i++) {
        board_array[i] = new Array(n).fill(0);
    }
    return board_array;
}

function setBoard() {
    let cellType1 = '<div class="type t1"></div>';
    let cellType2 = '<div class="type t2"></div>';

    let boardElement = document.createElement('div');
    boardElement.classList.add('board');
    document.querySelector("body").innerHTML = '';
    document.querySelector("body").appendChild(boardElement);

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if ((i + j) % 2 === 0) {
                boardElement.insertAdjacentHTML("beforeend", cellType1);
            } else {
                boardElement.insertAdjacentHTML("beforeend", cellType2);
            }
        }
    }

    const boardStyle = {
        display: "grid",
        width: "80vh",
        height: "80vh",
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
        backgroundColor: "white",
    };

    for (let property in boardStyle) {
        boardElement.style[property] = boardStyle[property];
    }

    const centerBoard = {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: 'center',
        alignItems: "center"
    };

    for (let property in centerBoard) {
        document.querySelector("body").style[property] = centerBoard[property];
    }
    return boardElement;
}

function placeQueen(boardElement, row, col) {
    const cellIndex = row * boardSize + col;
    const cell = boardElement.children[cellIndex];

    const queenImage = document.createElement('img');
    queenImage.src = queenImageSrc;
    queenImage.style.width = `100%`;
    queenImage.style.height = `100%`;

    cell.appendChild(queenImage);
}

function removeQueen(boardElement, row, col) {
    const cellIndex = row * boardSize + col;
    const cell = boardElement.children[cellIndex];
    cell.innerHTML = '';
}

function isSafe(board, row, col) {
    for (let i = 0; i < col; i++) {
        if (board[row][i] === 1) return false;
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }

    for (let i = row, j = col; i < boardSize && j >= 0; i++, j--) {
        if (board[i][j] === 1) return false;
    }

    return true;
}

async function solveBoard(board, col, boardElement) {
    if (col >= boardSize) {
        sol++;
        document.querySelector('.solutions').textContent = `Solutions: ${sol}`;
        await new Promise(resolve => setTimeout(resolve,1000))
        return;
    }

    for (let i = 0; i < boardSize; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            placeQueen(boardElement, i, col);

            await solveBoard(board,col+1,boardElement);

            board[i][col] = 0;
            removeQueen(boardElement, i, col);
        }
        else{
            placeQueen(boardElement, i , col);
            await new Promise(resolve => setTimeout(resolve,500))
            removeQueen(boardElement,i,col);
        }
    }
}

function problemSolution() {
    getBoardSize();
    let board = createBoard(boardSize);
    const boardElement = setBoard();
    const solutionsDiv = document.createElement('div');
    solutionsDiv.classList.add('solutions');
    document.querySelector("body").appendChild(solutionsDiv);
    solveBoard(board, 0, boardElement);
}

document.querySelector('button').addEventListener("click", problemSolution);
