import cat from '../assets/meow.png'
import dog from '../assets/woof.png'
import unicorn from '../assets/neigh.png'
import { useState } from "react";
import GameBoard from '../components/GameBoard';
document.cookie = "PlayerNumber1 Score= 0" 
document.cookie = "PlayerNumber2 Score= 0" 
document.cookie = "PlayerNumber3 Score= 0" 


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


const playerChars = [getPlayerChar("1"),getPlayerChar("2"),getPlayerChar("3")]


export default function Game(){

    //To update scores on the DOM
    //TODO MAKE IT ADD THE SCORE NOT JUST SWITCH TO 1!
    //Or figure out if you can use cookies??
    const [p1Score,updateP1Score] = useState(0)
    function refreshP1Score() {
        updateP1Score(parseInt(getCookieValue("PlayerNumber1 Score")))
    }

    const [p2Score,updateP2Score] = useState(0)
    function refreshP2Score() {
        updateP2Score(parseInt(getCookieValue("PlayerNumber2 Score")))
    }
    const [p3Score,updateP3Score] = useState(0)
    function refreshP3Score() {
        updateP3Score(parseInt(getCookieValue("PlayerNumber3 Score")))
    }


    return(
        <>
            <div style={{fontSize: '5vh',textAlign: 'center'}}>Dots• & Boxes☐</div>
            <div style={scoreBoard}>
                <div style={indivPScore}>
                    <img style={player1Icon} src={playerChars[0]} alt="Player 1 Icon"></img>
                    <p style={playerScore}>{p1Score}</p>
                </div>
                <div style={indivPScore}>
                    <img style={player2Icon} src={playerChars[1]} alt="Player 2 Icon"></img>
                    <p style={playerScore}>{p2Score}</p>
                </div>
                <div style={indivPScore}>
                    <img style={player3Icon} src={playerChars[2]} alt="Player 3 Icon"></img>
                    <p style={playerScore}>{p3Score}</p>
                </div>
            </div>

            <GameBoard />


        </>
    )
    
}