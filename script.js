console.log(11111);

const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = ['O', 'J', 'L', 'I', 'T','Z','S'];
const TETROMINOES = {
    'O': [[1,1],[1,1]], 'J': [[1,0,0],[1,1,1],[0,0,0]], 'L': [[1,0,0],[1,1,1],[0,0,0]],
    'I': [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], 'T': [[1,1,1],[0,1,0],[0,0,0]],
    'Z': [[1,1,0],[0,1,1],[0,0,0]], 'S': [[0,1,1],[1,1,0],[0,0,0]]
}

function getRandomTetrominoName() {
    const randomIndex = Math.floor(Math.random() * TETROMINO_NAMES.length);
    return TETROMINO_NAMES[randomIndex];
}

function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

let playfield;
let currentTetromino;

function generatePlayField() {
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div')
        document.querySelector('.grid').append(div)
    }
    
    playfield = new Array(PLAYFIELD_ROWS).fill().map(() => new Array(PLAYFIELD_COLUMNS).fill(0))
    // console.log(playfield);
}

function generateTetromino(){
    const name = getRandomTetrominoName();
    const matrix = TETROMINOES[name];
    const playfieldCenterColumn = Math.floor(PLAYFIELD_COLUMNS / 2);
    const tetrominoStartColumn = playfieldCenterColumn - Math.floor(matrix[0].length / 2);
    
    tetromino = {
        name,
        matrix,
        row: 0,
        column: tetrominoStartColumn
    }
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.grid div');

function drawPlayField() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if (playfield[row][column] == 0) continue;
            const name = playfield[row][column];
            const cellindex = convertPositionToIndex(row, column);
            // console.log(cellindex);
            cells[cellindex].classList.add(name);
        }
    }
}

function drawTetromino() {
    const name = tetromino.name;
    const matrixSize = tetromino.matrix.length;

    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if(!tetromino.matrix[row][column]) continue;
            const cellindex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            );
            // console.log(cellindex);
            cells[cellindex].classList.add(name);
        }
    }
}

function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawPlayField();
    drawTetromino();
}

draw();

document.addEventListener('keydown', onKeyPress);
function onKeyPress(event) {
    console.log(event);
    if (event.key === 'ArrowLeft') {
        tetromino.column--;
    } else if (event.key === 'ArrowRight') {
        tetromino.column++;
    } else if (event.key === 'ArrowDown') {
        moveTetrominoDown();
    }

    draw();
}

moveTetrominoDown = () => {
    tetromino.row++;
}
moveTetrominoLeft = () => {
    tetromino.column--;
}
moveTetrominoRight = () => {
    tetromino.column++;
}

