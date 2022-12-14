import cat from '../assets/meow.png'
import dog from '../assets/woof.png'
import unicorn from '../assets/neigh.png'
import { useRef, useState } from "react";



const charStyle ={
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap' 
}

export default function PlayerCard(props) {


    const inputRef = useRef(null)
    const [playerName, updateName] = useState('')

    const [wasCharSelected, updateState] = useState(false)//

    function setAsSelected() {
        updateState(true)
    }
    


    function setPlayer(playerNum,playerCharacter,playerName){
        if(!wasCharSelected){
            updateName(inputRef.current.value)
            document.cookie = "PlayerNumber"+playerNum+" Character="+playerCharacter 
            document.cookie = "PlayerNumber"+playerNum+" Name="+playerName

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

    let imgStyle = {
        width: '15vw',
        maxWidth: '90px',
        height: '15vw',
        maxHeight: '90px',
        border: '0.5px solid #B5B5B5',
        borderRadius: '80%',
        margin: '12px',
        backgroundColor: 'white', //figure out how to make it change colour  (only one of them)
        cursor: 'pointer'
    }

    let inputStyle = {

        fontSize: '2.6vh',
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        border: 'none',
        color: '#707070',
        borderRadius: "5px",
        backgroundColor: props.color,
        marginTop: '3vh',
        marginBottom: '3vh'
        

    }

    if (wasCharSelected){
        
        cardStyle['filter'] = 'grayscale(50%)'
        cardStyle['cursor'] = 'not-allowed'  
        imgStyle['cursor'] = 'not-allowed'

    }
   

    

 

    return(
        <>
        <div style={cardStyle}>
            <input style={inputStyle} ref= {inputRef} placeholder="ENTER NAME"></input>
        <div style={charStyle}>
            <img onClick={ ()=> setPlayer(props.num,"dog",inputRef.current.value)} style={imgStyle} src={dog} alt="dog"></img>
            <img onClick={ ()=> setPlayer(props.num,"unicorn",inputRef.current.value) }style={imgStyle} src={unicorn} alt="unicorn"></img>
            <img onClick={ ()=> setPlayer(props.num,"cat",inputRef.current.value) }style={imgStyle} src={cat} alt="cat"></img>
        </div>

        </div>
        </>
    )
}

// const Penis = styled.div`
//     width: 10vh;
//     height: 10vh;
//     border: 0.5px solid #B5B5B5;
//     borderRadius: 80%;
//     margin: 12px;
//     backgroundColor: white;
//     cursor: pointer;
// `