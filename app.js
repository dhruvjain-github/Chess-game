const express =require("express")
const {Chess}=require("chess.js")
const socket=require("socket.io")
const http=require("http")
const path=require("path")
const { log } = require("console")
const { title } = require("process")
// const index=require("./view/index.ejs")

const app=express()
const server=http.createServer(app)
const io=socket(server)

const chess=new Chess()
const players={}
const curentPlayer="W"

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("index",{title:"Chess Game"})
})

io.on("connection",(uniquesocket)=>{
    console.log("Connected");

    uniquesocket.on("disconnect",()=>{
        if(uniquesocket.id===players.white)
        {
            delete players.white
        }
        else if(uniquesocket.id===players.black)
        {
            delete players.black
        }
    })

    if(!players.white)
    {
        players.white=uniquesocket.id,
        uniquesocket.emit("PlayerRole","w")
    }
    else if(!players.black)
    {
        players.black=uniquesocket.id,
        uniquesocket.emit("PlayerRole","b")
    }
    else{
        uniquesocket.emit("Spectetor")
    }

    uniquesocket.on("move",(move)=>{
        try {
            if(chess.turn()==="w" &&uniquesocket.id!==players.white) return;
            if(chess.turn()==="b" &&uniquesocket.id!== players.black) return;

            // chess.move() is a in built function that verify the move is correct or not. it only runs when the move is correct. 
            const result=chess.move(move);

            if (result) {
                currentPlayer = chess.turn();
                io.emit("boardState", chess.fen()); // Update both players with the new board state
                io.emit("move", move);              // Notify all clients of the move
            } else {
                uniquesocket.emit("invalidMove", move); // Handle invalid moves
            }
            

        } catch (error) {
            console.log(error);
            uniquesocket.emit("invalidMove",move)
        }
    })
    
})

server.listen(3000,()=>{
    console.log(`your game is listening on ${"http://localhost:3000/"}`);
    
})