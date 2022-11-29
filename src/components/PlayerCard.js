import cat from '../assets/meow.png'
import dog from '../assets/woof.png'
import unicorn from '../assets/neigh.png'
import { useState } from "react";






const charStyle ={
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap' 
}

export default function PlayerCard(props) {


    // const [charSelected, updateState] = useState('white') //

    // function highlightSelected() {
    //     if (charSelected==='#FFCEE6'){
    //         updateState('white')

    //     }
    //     else {
    //         updateState('#FFCEE6')
    //     }
    // }

    const [wasCharSelected, updateState] = useState(false)//

    function setAsSelected() {
        updateState(true)
    }


    function setPlayer(playerNum,playerCharacter,color){
        if(!wasCharSelected){
            document.cookie = "PlayerNumber"+playerNum+" Character="+playerCharacter 
            setAsSelected()
        }

    }

    let cardStyle={
        margin: "10px",
        backgroundColor: props.color,
        width: '80%',
        maxWidth: '400px',
        height: '200px',
        borderRadius: '40px',
        justifyContent: 'center',
        padding: '10px'
    }

    if (wasCharSelected){
        cardStyle={
            margin: "10px",
            backgroundColor: props.color,
            width: '80%',
            maxWidth: '400px',
            height: '200px',
            borderRadius: '40px',
            justifyContent: 'center',
            padding: '10px',
            filter: 'grayscale(50%)'
        }
    }
    const imgStyle = {
        width: '10vh',
        height: '10vh',
        border: '0.5px solid #B5B5B5',
        borderRadius: '80%',
        margin: '12px',
        backgroundColor: 'white', //figure out how to make it change colour  (only one of them)
        cursor: 'pointer'
    }



 

    return(
        <>
        <div style={cardStyle}>
        <p style={{fontSize: "2.5vh", textAlign:"center"}}>PLAYER {props.num}</p>
        <div style={charStyle}>
            <img onClick={ ()=> setPlayer(props.num,"dog",props.color) } style={imgStyle} src={dog} alt="dog"></img>
            <img onClick={ ()=> setPlayer(props.num,"unicorn",props.color) }style={imgStyle} src={unicorn} alt="unicorn"></img>
            <img onClick={ ()=> setPlayer(props.num,"cat",props.color) }style={imgStyle} src={cat} alt="cat"></img>
        </div>

        </div>
        </>
    )
}