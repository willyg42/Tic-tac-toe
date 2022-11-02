const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
canvas.addEventListener('click', takeTurn)
turn = 0
drawBoard()
let board = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

function drawLine(ctx, beginPoint, endPoint) {
    ctx.beginPath
    ctx.moveTo(...beginPoint)
    ctx.lineTo(...endPoint)
    ctx.stroke()
}

function drawBoard() {
    ctx.lineWidth = 3
    drawLine(ctx, [200, 0], [200, 600])
    drawLine(ctx, [400, 0], [400, 600])
    drawLine(ctx, [0, 200], [600, 200])
    drawLine(ctx, [0, 400], [600, 400])
}

function markSpace() {
    ctx.font = '100pt serif' 
    mark = (turn ? 'O' : 'X')
    ctx.fillText(mark, 50, 125)
}

function takeTurn(e) {
    row = Math.floor(e.y / 200)
    col = Math.floor(e.x / 200)
    if (board[row][col] == -1) {
        markSpace() 
    }
}
