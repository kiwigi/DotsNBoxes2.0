import { useContext, useEffect, useState } from "react"
import cat from '../assets/meow.png'
import dog from '../assets/woof.png'
import unicorn from '../assets/neigh.png'
import styled from 'styled-components';
import {SocketContext} from '../context/socket';




const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)



function getNextTurn(currPlayer){
    let nextPlayer = 0
    if(currPlayer===2){
        nextPlayer=0
    
    }else{
        nextPlayer = currPlayer + 1
    }
    return nextPlayer
}




export default function GameBoard(props){

    const socket = useContext(SocketContext)

    const [gameState, updateState] = useState(props.gameState)
    
    const sendGameState = () => {
        socket.emit("send_gameState",gameState)
    }


    function updateBoard(index){
        let newGameState = {
            ...gameState
        }
        let newBoard = gameState.BoardState
        newBoard[index] = gameState.CurrentTurn
        newGameState.BoardState = newBoard
        updateState(newGameState)
    }

    function updateTurn(){
        let newGameState2 = {
            ...gameState
        }
        const nextTurn = getNextTurn(gameState.CurrentTurn)
        newGameState2.CurrentTurn=nextTurn
        updateState(newGameState2)
    }


    // const [lineColor, selectLine] = useState("white")
    function updateLine(index) {
        let newGameState = {
            ...gameState
        }
        const playerColor = gameState.Players[gameState.CurrentTurn].Color
        
        newGameState.LineColors[index] = playerColor
        
    }

    function checkIfSquare(indecies){
        const possibleSquares = [
            [0,1,2,3],[3,4,5,6],[6,7,8,9],[10,2,11,12],[12,5,13,14],[14,8,15,16],[17,11,18,19],[19,13,20,21],[21,15,22,23]
        ]
        const left = gameState.BoardState[indecies[0]]
        const top = gameState.BoardState[indecies[1]]
        const bottom = gameState.BoardState[indecies[2]]
        const right = gameState.BoardState[indecies[3]]

        if(left && right && bottom && top >-1){
            return true
        }else{
            return false
        }
    }

    const adjList = [
        [0,1,2,3,4,5,6,7,8,9],
        [10,2,11,12,5,13,14,8,15,16],
        [17,11,18,19,13,20,21,15,22,23]
    ]

    //bc socket is used in dependency list, whenever event is emitted, this function will run
    useEffect( () => {
        socket.on("recieve_gameState", (data) => {
            updateState(data);
        })
    }, [socket]);

    function setCookie(){
        document.cookie = "CurrentTurn =" + gameState.CurrentTurn
        document.cookie = "Players =" + JSON.stringify(gameState.Players)
        document.cookie = "Player1 =" + JSON.stringify(gameState.Player1)
        document.cookie = "Player2 =" + JSON.stringify(gameState.Player2)
        document.cookie = "Player3 =" + JSON.stringify(gameState.Player3)
        document.cookie = "BoardState ="+ gameState.BoardState
        document.cookie = "LineColors ="+ gameState.LineColors
    }


    function handleClick(index){
        updateBoard(index)
        updateLine(index)
        updateTurn()
        sendGameState()
    }
    setCookie()


    //LINES
    const HLine = styled.div`
    width: 85%;
    height: 15%;
    border: 3px solid white;
    border-radius: 25px;
    cursor: pointer;
    position: absolute;
    background-color: ${ props=> props.color };
    left: 0.8vw;
    `
    const BHLine = styled(HLine)`
    bottom: -2vh;
    `
    const THLine = styled(HLine)`
    top: -1.5vh;
    `
    // background-color: ${};

    const VLine = styled.div`
    width: 15%;
    height: 80%;
    // border: 3px solid #FFCEE6;
    border-radius: 25px;
    cursor: pointer;
    position: absolute;
    background-color: ${ props=> props.color };
    top: 12%;
    `

    const RVLine = styled(VLine)`
    right: -1vw;
    `

    const LVLine = styled(VLine)`
    left: -0.5vw;
    `

    return(
        <>
        <p style={{textAlign: "center"}}>Player {gameState.CurrentTurn}'s Turn</p>
        <Wrapper>
            <Row>
                <Square> <TopLeftDot/> <TopRightDot/> <BottomLeftDot/> <BottomRightDot/> <LVLine onClick={() => handleClick(0)} color = {gameState.LineColors[0]}/> <THLine onClick={() => handleClick(1)} color = {gameState.LineColors[1]}/> <BHLine onClick={() => handleClick(2)} color = {gameState.LineColors[2]}/> </Square>
                <Square> <TopRightDot/> <BottomRightDot/> <LVLine onClick={() => handleClick(3)} color = {gameState.LineColors[3]}/>  <THLine onClick={() => handleClick(4)} color = {gameState.LineColors[4]}/> <BHLine onClick={() => handleClick(5)} color = {gameState.LineColors[5]}/>  </Square>
                <Square> <TopRightDot/> <BottomRightDot/> <LVLine onClick={() => handleClick(6)} color = {gameState.LineColors[6]}/> <THLine onClick={() => handleClick(7)} color = {gameState.LineColors[7]}/> <BHLine onClick={() => handleClick(8)} color = {gameState.LineColors[8]}/> <RVLine onClick={() => handleClick(9)} color = {gameState.LineColors[9]}/> </Square>
            </Row>
            <Row>
                <Square>  <BottomLeftDot/> <BottomRightDot/> <LVLine onClick={() => handleClick(10)} color = {gameState.LineColors[10]}/> <BHLine onClick={() => handleClick(11)} color = {gameState.LineColors[11]}/> </Square>
                <Square>  <BottomRightDot/> <LVLine onClick={() => handleClick(12)} color = {gameState.LineColors[12]}/>   <BHLine onClick={() => handleClick(13)} color = {gameState.LineColors[13]}/>  </Square>
                <Square>  <BottomRightDot/> <LVLine onClick={() => handleClick(14)} color = {gameState.LineColors[14]}/>  <BHLine onClick={() => handleClick(15)} color = {gameState.LineColors[15]}/> <RVLine onClick={() => handleClick(16)} color = {gameState.LineColors[16]}/> </Square>
            </Row>
            <Row>
                <Square>  <BottomLeftDot/> <BottomRightDot/> <LVLine onClick={() => handleClick(17)} color = {gameState.LineColors[17]}/>   <BHLine onClick={() => handleClick(18)} color = {gameState.LineColors[18]}/> </Square>
                <Square>  <BottomRightDot/> <LVLine onClick={() => handleClick(19)} color = {gameState.LineColors[19]}/>   <BHLine onClick={() => handleClick(20)} color = {gameState.LineColors[20]}/>  </Square>
                <Square>  <BottomRightDot/> <LVLine onClick={() => handleClick(21)} color = {gameState.LineColors[21]}/>  <BHLine onClick={() => handleClick(22)} color = {gameState.LineColors[22]}/> <RVLine onClick={() => handleClick(23)} color = {gameState.LineColors[23]}/> </Square>
            </Row>

        </Wrapper>
        
        
        </>
    )
}

//DOTS
const Dot = styled.div`
    background-color: #707070;
    width: 3vw;
    max-width: 20px;
    max-height: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    z-index: 1;

`
const TopRightDot = styled(Dot)`
    right: -1vw;
    top: -0.5vw;

`

const TopLeftDot = styled(Dot)`
    left: -0.5vw;
    top: -0.5vw;  
`
const BottomLeftDot = styled(Dot)`
    bottom: -1vw;
    left: -0.5vw;
`
const BottomRightDot = styled(Dot)`
    bottom: -1vw;
    right: -1vw;
`

//WRAPPER
const Wrapper = styled.div`
    width: 90vw;
    aspect-ratio: 1;
    max-width: 550px;
    border: 3px solid #FFCEE6;
    border-radius: 50px;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    justify-content: center;
    display: flex;
    flex-direction: column
`
const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`
const Square = styled.div`
    width: 20vw;
    aspect-ratio: 1;
    max-width: 145px;
    max-height: 145px;
    // border: 1px solid black;
    position: relative;
    display: flex;
`
