const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
canvas.addEventListener('click', takeTurn)
turn = 'X'
drawBoard()
let board = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

function drawLine(beginPoint, endPoint) {
    ctx.beginPath()
    ctx.moveTo(...beginPoint)
    ctx.lineTo(...endPoint)
    ctx.stroke()
}

function drawBoard() {
    ctx.lineWidth = 3
    drawLine([200, 0], [200, 600])
    drawLine([400, 0], [400, 600])
    drawLine([0, 200], [600, 200])
    drawLine([0, 400], [600, 400])
}

function drawMark(x, y) {
    ctx.lineWidth = 10
    if (turn == 'X') {
        drawLine([x + 30, y + 30], [x + 170, y + 170])
        drawLine([x + 170, y + 30], [x + 30, y + 170])
    } else {
        ctx.beginPath()
        ctx.arc(x + 100, y + 100, 75, 2 * Math.PI, false)
        ctx.stroke() 
    }
}

function takeTurn(e) {
    row = Math.floor(e.y / 200)
    col = Math.floor(e.x / 200)
    if (board[row][col] == -1) {
        board[row][col] = turn
        drawMark(col * 200, row * 200)
        x = checkWin(row, col)
        if (checkWin(row, col)) {
            drawResult(`${turn} Wins!`)
            canvas.removeEventListener('click', takeTurn)
        }
        turn = (turn == 'X' ? 'O' : 'X')
    }
}

function mod(n, m) {
    return ((n % m) + m) % m
}

function drawResult(result) {
    ctx.font = '48px serif'
    ctx.fillText(result, 210, 650)
}

function checkWin(row, col) {
    //check Vertical
    if (board[mod(row - 1, 3)][col] == turn && board[mod(row + 1, 3)][col] == turn) {
        return true
    }
    //check Horizontal
    if (board[row][mod(col - 1, 3)] == turn && board[row][mod(col + 1, 3)] == turn) {
        return true
    }
    //check Top Left Diagonals
    if (row == col) {
        if (board[mod(row - 1, 3)][mod(col - 1, 3)] == turn && board[mod(row + 1, 3)][mod(col + 1, 3)] == turn) {
            return true
        }
    }
    //check Top Right Diagonals
    if (row + col == 2) {
        if (board[mod(row - 1, 3)][mod(col + 1, 3)] == turn && board[mod(row + 1, 3)][mod(col - 1, 3)] == turn) {
            return true
        }
    }
    return false
}
