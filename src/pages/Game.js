import cat from '../assets/meow.png'
import dog from '../assets/woof.png'
import unicorn from '../assets/neigh.png'
import { useState } from "react";
import GameBoard from '../components/GameBoard';
import io from 'socket.io-client';
import { useContext } from "react";
import {SocketContext, socket} from '../context/socket';




const playerColors = ['#E6F8FF','#D9FFCE','#F7D8FF']

const scoreBoard = {
    display: 'flex',
    justifyContent: 'center',
}

const indivPScore = {
    position: 'relative' 
}

const player1Icon = {
    width: '5vh',
    height: '5vh',
    borderRadius: '80%',
    margin: '12px',
    backgroundColor: playerColors[0],
}

const player2Icon = {
    width: '5vh',
    height: '5vh',
    borderRadius: '80%',
    margin: '12px',
    backgroundColor: playerColors[1],
}

const player3Icon = {
    width: '5vh',
    height: '5vh',
    borderRadius: '80%',
    margin: '12px',
    backgroundColor: playerColors[2],
}

const playerScore = {
    position: 'absolute',
    bottom: '0px',
    left: '45px',
    fontWeight: '700'
}

//The following code is from https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

function getPlayerChar(playerNum){
    const pChar = getCookieValue("PlayerNumber"+playerNum+" Character")
    
    if(pChar==="dog"){
        return {dog}["dog"]
    }else if(pChar==="unicorn"){
        return {unicorn}["unicorn"]
    }else if(pChar==="cat"){
        return {cat}["cat"]
    }
    else{
        return ""
    }
}

   function toArr(string){
        let arr = string.split(",")
        console.log(arr)
        return arr
    }



const playerChars = [getPlayerChar("1"),getPlayerChar("2"),getPlayerChar("3")]
let lineIDs = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
let lineColors = ["white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white",]

export default function Game(){

    let gameStateObj = {}

 

    if(getCookieValue("Players") !== ""){
            gameStateObj = {
            CurrentTurn: parseInt(getCookieValue("CurrentTurn")),
            Players: JSON.parse(getCookieValue("Players")),
            Player1: JSON.parse(getCookieValue("Player1")),
            Player2: JSON.parse(getCookieValue("Player2")),
            Player3: JSON.parse(getCookieValue("Player3")),
            BoardState: toArr(getCookieValue("BoardState")),
            LineColors: toArr(getCookieValue("LineColors"))
        }
    }else{
        gameStateObj = {
        
            CurrentTurn: 0,
            Players: [
                {
                    Color: playerColors[0],
                    Character: playerChars[0],
                    Score: 0
                },
                {
                    Color: playerColors[1],
                    Character: playerChars[1],
                    Score: 0,
                },
               {
                    Color: playerColors[2],
                    Character: playerChars[2],
                    Score: 0
                }
            ],
            Player1: {
                Color: playerColors[0],
                Character: playerChars[0],
                Score: 0
            },
            Player2: {
                Color: playerColors[1],
                Character: playerChars[1],
                Score: 0,
            },
            Player3: {
                Color: playerColors[2],
                Character: playerChars[2],
                Score: 0
            },
            BoardState: lineIDs,
            LineColors: lineColors,
    
        }
 
    }

    const sendData = () => {
        socket.emit("send_data",{cat: "meow"})
    }

    const [gameState, updateGameState] = useState(gameStateObj)

   
    function updateP1Score() {
        let newGameState = {
            ...gameState
        }
        newGameState.Player1.Score = newGameState.Player1.Score+1
        updateGameState(newGameState)
        console.log(gameState)
    }
    function updateP2Score() {
        let newGameState = {
            ...gameState
        }
        newGameState.Player2.Score = newGameState.Player2.Score+1
        updateGameState(newGameState)
        console.log(gameState)
    }
    function updateP3Score() {
        let newGameState = {
            ...gameState
        }
        newGameState.Player2.Score = newGameState.Player2.Score+1
        updateGameState(newGameState)
        console.log(gameState)
    }



    return(
        <>
       <p onClick={sendData}> send data</p>
            <div style={{fontSize: '5vh',textAlign: 'center'}}>Dots• & Boxes☐</div>
            <div style={scoreBoard}>
                <div style={indivPScore}>
                    <img style={player1Icon} src={gameState.Player1.Character} alt="Player 1 Icon"></img>
                    <p style={playerScore}>{gameState.Player1.Score}</p>
                </div>
                <div style={indivPScore}>
                    <img style={player2Icon} src={gameState.Player2.Character} alt="Player 2 Icon"></img>
                    <p style={playerScore}>{gameState.Player2.Score}</p>
                </div>
                <div style={indivPScore}>
                    <img style={player3Icon} src={gameState.Player3.Character} alt="Player 3 Icon"></img>
                    <p style={playerScore}>{gameState.Player3.Score}</p>
                </div>
            </div>
            <SocketContext.Provider value={socket}>
                <GameBoard gameState={gameState}/>
            </SocketContext.Provider>


        </>
    )
    
}