// const { Chess } = require("chess.js");

const socket = io();
const chess = new Chess()
const boardElement = document.querySelector(".chessboard")

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = ""
    board.forEach((row, rowidx) => {
        row.forEach((square, squareidx) => {
            const squareElement = document.createElement("div")
            squareElement.classList.add(
                "square",
                (rowidx + squareidx) % 2 == 0 ? "light" : "dark"
            )

            squareElement.dataset.row = rowidx
            squareElement.dataset.col = squareidx

            if (square) {
                const pieceElement = document.createElement("div")
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                )
                pieceElement.innerText = getPieceUnicode(square)
                pieceElement.draggable = playerRole === square.color

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement
                        sourceSquare = { row: rowidx, col: squareidx }
                        e.dataTransfer.setData("text/plain", "")
                    }
                })

                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null
                    sourceSquare = null
                })

                squareElement.appendChild(pieceElement)
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault()
            })

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
            
                    handleMove(sourceSquare, targetSource);
                    draggedPiece = null; // Reset dragged piece after move
                    sourceSquare = null;
                }
            });
                
            boardElement.appendChild(squareElement)
        })
    })

    if (playerRole === "b") {
        boardElement.classList.add("flipped")
    }
    else {
        boardElement.classList.remove("flipped")
    }
}

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: `q`
    }

    socket.emit("move", move)
}

socket.on("PlayerRole", function (role) {
    playerRole = role
    renderBoard()
})

socket.on("Spectetor", function () {
    playerRole = null
    renderBoard()
})

socket.on("boardState", function (fen) {
    chess.load(fen)
    renderBoard()
})

socket.on("move", function (move) {
    chess.move(move)
    renderBoard()
})

const getPieceUnicode = (piece) => {
    const UnicodePieces = {
        p: '♙',
        r: '♜',
        n: '♞',
        b: '♝',
        q: '♛',
        k: '♚',
        P: '♙',
        R: '♜',
        N: '♞',
        B: '♝',
        Q: '♛',
        K: '♚',
    }

    return UnicodePieces[piece.type] || ""
}

renderBoard()